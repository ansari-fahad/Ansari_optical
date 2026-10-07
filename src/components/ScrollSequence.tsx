import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Layers, ShieldCheck, Cpu, Compass, Sliders, ChevronDown } from 'lucide-react';

export interface ScrollSequenceProps {
  framePath?: string;
  frameCount?: number;
  framePrefix?: string;
  framePadding?: number;
  extension?: string;
  containerHeight?: string; // e.g. "450vh"
  onConfigureClick?: () => void;
}

export const ScrollSequence: React.FC<ScrollSequenceProps> = ({
  framePath = '/frames',
  frameCount = 240,
  framePrefix = 'ezgif-frame-',
  framePadding = 3,
  extension = 'jpg',
  containerHeight = '450vh',
  onConfigureClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const activeFrameRef = useRef<number>(1);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(1);
  const [currentChapter, setCurrentChapter] = useState<number>(0);

  // Generate padded frame filename
  const getFrameUrl = useCallback(
    (index: number) => {
      const padded = String(index).padStart(framePadding, '0');
      return `${framePath}/${framePrefix}${padded}.${extension}`;
    },
    [framePath, framePrefix, framePadding, extension]
  );

  // Draw a specific frame onto the canvas with high-DPI scaling & aspect preservation
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Retrieve image or find nearest available fallback
    let img = imagesRef.current.get(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame to prevent glitching
      for (let offset = 1; offset < frameCount; offset++) {
        const prev = imagesRef.current.get(frameIndex - offset);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current.get(frameIndex + offset);
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Resize canvas buffer if necessary
    const targetW = Math.round(displayWidth * dpr);
    const targetH = Math.round(displayHeight * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Cover / contain calculation preserving spectacle geometry
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const screenRatio = displayWidth / displayHeight;

    let drawW = displayWidth;
    let drawH = displayHeight;
    let offsetX = 0;
    let offsetY = 0;

    // For spectacles, use responsive contain geometry preserving full frame width on mobile
    if (screenRatio > imgRatio) {
      drawW = displayWidth;
      drawH = displayWidth / imgRatio;
      offsetY = (displayHeight - drawH) / 2;
      offsetX = 0;
    } else {
      // Portrait / phone viewports: scale to width with generous safety margins so temples never clip
      drawW = displayWidth * 1.08;
      drawH = drawW / imgRatio;
      offsetX = (displayWidth - drawW) / 2;
      offsetY = (displayHeight - drawH) / 2;
    }

    // Clear and draw
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    ctx.restore();
    activeFrameRef.current = frameIndex;
  }, [frameCount]);

  // Preload frames progressively: Phase 1 (instant keyframes), Phase 2 (all frames)
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const preloadImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current.has(index)) {
          resolve(imagesRef.current.get(index)!);
          return;
        }

        const img = new Image();
        img.src = getFrameUrl(index);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current.set(index, img);
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / frameCount) * 100));
            // Trigger instant initial paint once frame 1 is ready
            if (index === 1) {
              setIsInitialReady(true);
              requestAnimationFrame(() => drawFrame(1));
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          // If individual frame fails, don't crash
          loadedCount++;
          resolve(img);
        };
      });
    };

    // Priority 1: Key frames spaced throughout sequence for immediate scrolling response
    const keyFrames = [1, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
    Promise.all(keyFrames.map((idx) => preloadImage(idx))).then(() => {
      if (isCancelled) return;
      setIsInitialReady(true);

      // Priority 2: Preload remaining frames in batches
      const remainingIndices = Array.from({ length: frameCount }, (_, i) => i + 1).filter(
        (i) => !keyFrames.includes(i)
      );

      const batchSize = 10;
      let batchIndex = 0;

      const loadNextBatch = () => {
        if (isCancelled || batchIndex >= remainingIndices.length) return;
        const currentBatch = remainingIndices.slice(batchIndex, batchIndex + batchSize);
        batchIndex += batchSize;
        Promise.all(currentBatch.map((idx) => preloadImage(idx))).then(() => {
          if (!isCancelled) {
            // Use requestIdleCallback or setTimeout to yield to main thread
            setTimeout(loadNextBatch, 16);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [frameCount, getFrameUrl, drawFrame]);

  // Smooth animation loop & scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Current scrolled distance inside container
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      targetProgressRef.current = rawProgress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Smooth Lerp Render Loop
    let lastRenderedFrame = -1;
    const animate = () => {
      // Lerp progress for smooth deceleration
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.14; // Snappy yet silky response

      const calculatedFrame = Math.max(
        1,
        Math.min(frameCount, Math.round(currentProgressRef.current * (frameCount - 1)) + 1)
      );

      if (calculatedFrame !== lastRenderedFrame) {
        drawFrame(calculatedFrame);
        lastRenderedFrame = calculatedFrame;
        setCurrentFrameDisplay(calculatedFrame);

        // Calculate Chapter (0 to 3)
        const progress = currentProgressRef.current;
        if (progress < 0.25) setCurrentChapter(0);
        else if (progress < 0.50) setCurrentChapter(1);
        else if (progress < 0.75) setCurrentChapter(2);
        else setCurrentChapter(3);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (lastRenderedFrame > 0) {
        drawFrame(lastRenderedFrame);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [frameCount, drawFrame]);

  // Jump to specific chapter directly
  const jumpToProgress = (progressRatio: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDistance = rect.height - window.innerHeight;
    window.scrollTo({
      top: containerTop + scrollableDistance * progressRatio,
      behavior: 'smooth',
    });
  };

  const progressPct = Math.round(currentProgressRef.current * 100);

  return (
    <section
      ref={containerRef}
      id="scrollytelling-experience"
      className="relative w-full bg-[#09090b] text-white"
      style={{ height: containerHeight }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#09090b]">
        {/* Canvas Engine */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: isInitialReady ? 1 : 0 }}
        />

        {/* Subtle Vignette & Grain */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090b]/80 via-transparent to-[#09090b]/50" />
        <div className="absolute inset-0 pointer-events-none bg-grain opacity-40" />

        {/* Loading Overlay (fades out as keyframes load) */}
        {!isInitialReady && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#09090b] text-white">
            <div className="w-12 h-12 border border-white/20 border-t-white rounded-full animate-spin mb-6" />
            <p className="font-serif tracking-widest text-xs uppercase text-zinc-400">
              Ansari Optical
            </p>
            <p className="font-mono text-[11px] text-zinc-500 mt-2">
              Calibrating Optical Sequence... {loadProgress}%
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* SYNCHRONIZED SCENE TEXT OVERLAYS                        */}
        {/* ======================================================== */}

        {/* SCENE 01: PURE ARCHITECTURE (0% - 24%) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-10 md:p-16 lg:p-20 transition-all duration-700 ${
            currentChapter === 0
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-xl mt-10 sm:mt-16 pr-8 sm:pr-0">
            <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-300">
                Chapter 01 / Monolith Form
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Sculpted from <br />
              <span className="italic font-light text-zinc-300">Monolithic Acetate</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-md">
              Cured over ninety days in Fukui, Japan. Each frame is hand-beveled along continuous micro-arcs to capture light with architectural quietude.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-white/10 pt-3 sm:pt-4 text-[10px] sm:text-xs text-zinc-500 font-mono">
            <span>MODEL: G-100 MONOLITH</span>
            <span className="hidden sm:inline">8MM BLOCK DENSITY / ZERO WARPAGE</span>
            <span className="flex items-center gap-1">
              SCROLL TO DECONSTRUCT <ChevronDown className="w-3 h-3 animate-bounce" />
            </span>
          </div>
        </div>

        {/* SCENE 02: THE ANATOMY OF TENSION (25% - 49%) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-10 md:p-16 lg:p-20 transition-all duration-700 ${
            currentChapter === 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-xl self-end text-right mt-10 sm:mt-16 pr-8 sm:pr-0">
            <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md mb-3 sm:mb-4">
              <Compass className="w-3 h-3 text-white" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-300">
                Chapter 02 / Suspension
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              The Anatomy <br />
              <span className="italic font-light text-zinc-300">of Pure Tension</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-md ml-auto">
              The temple core wires emerge. Milled beta-titanium wire preserves shape memory under constant flexion, eliminating pressure points across delicate temples.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-white/10 pt-3 sm:pt-4 text-[10px] sm:text-xs text-zinc-500 font-mono">
            <span>CORE: TITANIUM β-ALLOY</span>
            <span className="hidden sm:inline">DYNAMIC CALIPER FIT</span>
            <span>TEMPLE WEIGHT: 4.2 GRAMS</span>
          </div>
        </div>

        {/* SCENE 03: DECONSTRUCTED CRAFTSMANSHIP (50% - 74%) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-10 md:p-16 lg:p-20 transition-all duration-700 ${
            currentChapter === 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-xl mt-10 sm:mt-16 pr-8 sm:pr-0">
            <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md mb-3 sm:mb-4">
              <Layers className="w-3 h-3 text-white" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-300">
                Chapter 03 / Mechanical Truth
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Zero Adhesives. <br />
              <span className="italic font-light text-zinc-300">Mechanical Harmony.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-md">
              Every screw, anchor plate, and hinge barrel is individually turned from solid titanium stock. Engineered to be completely dismantled, serviced, and handed down.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/10 pt-3 sm:pt-4 text-[10px] sm:text-xs font-mono text-zinc-400">
            <div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500">HINGE SYSTEM</p>
              <p className="text-white font-medium">5-Barrel Interlock</p>
            </div>
            <div>
              <p className="text-[9px] sm:text-[10px] text-zinc-500">RIVET HARDWARE</p>
              <p className="text-white font-medium">Cold-Pressed Silver</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-zinc-500">TOLERANCE</p>
              <p className="text-white font-medium">±0.02 Millimeters</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] text-zinc-500">LIFESPAN</p>
              <p className="text-white font-medium">Guaranteed Forever</p>
            </div>
          </div>
        </div>

        {/* SCENE 04: SCHEMATIC SPECIFICATION & CONVERSION (75% - 100%) */}
        <div
          className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-10 md:p-16 lg:p-20 transition-all duration-700 ${
            currentChapter === 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="max-w-xl self-end text-right mt-10 sm:mt-16 pr-8 sm:pr-0">
            <div className="inline-flex items-center gap-2 border border-white/15 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md mb-3 sm:mb-4">
              <Cpu className="w-3 h-3 text-white" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-300">
                Chapter 04 / Blueprint Verified
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Exploded Precision. <br />
              <span className="italic font-light text-zinc-300">Ready for Your Vision.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-light leading-relaxed max-w-md ml-auto">
              Model G-100 is engineered to host ultra-thin prescription optics with zero edge distortion. Select your custom frame tone and optical index.
            </p>

            {/* Direct Conversion CTA Button */}
            <div className="mt-5 sm:mt-6 pointer-events-auto flex items-center justify-end">
              <button
                onClick={onConfigureClick}
                className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-all shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Configure Model G-100</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 border-t border-white/10 pt-3 sm:pt-4 text-[10px] sm:text-xs text-zinc-400 font-mono">
            <span>CALIBRATION: 100% COMPLETE</span>
            <span className="hidden sm:inline">SCHEMATIC ID: G100-EXP-2026</span>
            <span className="text-white">BASE PRICE $385 USD</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE CONTROLS & TIMELINE HUD (TOP/RIGHT/BOTTOM)   */}
        {/* ======================================================== */}

        {/* Right Lateral Timeline / Chapter Scrub Points */}
        <div className="absolute right-2 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3 sm:gap-4">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {[
              { label: '01', title: 'Form', ratio: 0.1 },
              { label: '02', title: 'Tension', ratio: 0.35 },
              { label: '03', title: 'Craft', ratio: 0.62 },
              { label: '04', title: 'Blueprint', ratio: 0.9 },
            ].map((ch, idx) => (
              <button
                key={ch.label}
                onClick={() => jumpToProgress(ch.ratio)}
                className="group relative flex items-center justify-end gap-2 sm:gap-3 focus:outline-none p-1"
                aria-label={`Jump to ${ch.title}`}
              >
                <span className="hidden md:inline font-mono text-[10px] uppercase text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
                  {ch.title}
                </span>
                <span
                  className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    currentChapter === idx
                      ? 'w-1.5 sm:w-2 h-5 sm:h-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                      : 'bg-zinc-600 group-hover:bg-zinc-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Micro Frame Counter */}
          <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-white/10 flex flex-col items-center">
            <span className="font-mono text-[8px] sm:text-[9px] text-zinc-500 tracking-wider">FRAME</span>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-300 font-medium">
              {String(currentFrameDisplay).padStart(3, '0')}
            </span>
          </div>
        </div>

        {/* Bottom Floating Progress Pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
            <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-75"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-zinc-400">
              {progressPct}% EXPLODED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
