import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { X, Camera, RefreshCw, Sparkles, Check, ChevronRight } from 'lucide-react';

interface VirtualTryOnModalProps {
  initialProduct?: Product;
  onClose: () => void;
  onSelectForStudio: (product: Product) => void;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  initialProduct = PRODUCTS[0],
  onClose,
  onSelectForStudio,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct);
  const [activeModel, setActiveModel] = useState<number>(0);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const modelPresets = [
    {
      name: 'Elena',
      age: '24',
      faceShape: 'Oval / High Cheekbones',
      image: '/images/muse_portrait.jpg',
      recommendation: 'Model G-100 & Model V-88 naturally emphasize jawline definition.',
    },
    {
      name: 'Sora',
      age: '22',
      faceShape: 'Delicate Angular',
      image: '/images/muse_side.jpg',
      recommendation: 'Model A-204 Beta-Titanium softens facial angles with featherweight grace.',
    },
    {
      name: 'Kaori',
      age: '27',
      faceShape: 'Square Architectural',
      image: '/images/muse_portrait.jpg',
      recommendation: 'Model L-07 Round Panto balances sharp jawlines with organic curves.',
    },
  ];

  // Camera activation
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      setCameraError('Camera access unavailable. Using high-definition studio muse presets.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0e0e11] border border-white/10 shadow-2xl text-white my-8 overflow-hidden">
        {/* Top Bar */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block">
                VIRTUAL OPTICAL MIRROR
              </span>
              <h2 className="font-serif text-2xl text-white">
                Facial Geometry & Scale Simulation
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Main Visual Mirror Screen */}
          <div className="lg:col-span-8 bg-[#070709] relative min-h-[420px] sm:min-h-[500px] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={modelPresets[activeModel].image}
                  alt={modelPresets[activeModel].name}
                  className="w-full h-full object-cover max-h-[550px] filter grayscale contrast-115"
                />
              </div>
            )}

            {/* Overlaid Glasses Frame Geometry Simulation (SVG Silhouette or frame overlay) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-[340px] sm:w-[420px] transition-all duration-300 transform -translate-y-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] opacity-95"
                />
              </div>
            </div>

            {/* Floating Camera / Model Switcher Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3 pointer-events-auto">
              {isCameraActive ? (
                <button
                  onClick={stopCamera}
                  className="flex items-center gap-2 bg-black/80 hover:bg-black text-white text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Switch to Editorial Muses</span>
                </button>
              ) : (
                <button
                  onClick={startCamera}
                  className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full font-medium transition-colors shadow-lg"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Enable Live Webcam Mirror</span>
                </button>
              )}

              {!isCameraActive && (
                <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10">
                  {modelPresets.map((m, idx) => (
                    <button
                      key={m.name}
                      onClick={() => setActiveModel(idx)}
                      className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase transition-all ${
                        activeModel === idx
                          ? 'bg-white text-black font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Camera error toast */}
            {cameraError && (
              <div className="absolute top-4 inset-x-4 bg-red-950/80 border border-red-500/30 text-red-200 text-xs p-3 backdrop-blur-md">
                {cameraError}
              </div>
            )}
          </div>

          {/* Right Frame Selection & Fit Advice Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between bg-[#121216]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                ACTIVE FRAME
              </span>
              <h3 className="font-serif text-2xl text-white mt-1">
                {selectedProduct.name}
              </h3>
              <p className="font-mono text-xs text-zinc-400 mt-0.5">
                {selectedProduct.code} · ${selectedProduct.price} USD
              </p>

              {/* Fit analysis badge */}
              <div className="mt-6 p-4 bg-white/5 border border-white/10">
                <span className="font-mono text-[10px] uppercase text-zinc-400 block mb-1">
                  FACIAL GEOMETRY ADVICE
                </span>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {!isCameraActive
                    ? modelPresets[activeModel].recommendation
                    : 'The straight architectural browline balances medium to high bridges and lifts cheek contours.'}
                </p>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-zinc-500 border-t border-white/5 pt-2">
                  <span>FRAME CALIPER</span>
                  <span>{selectedProduct.dimensions.lensWidth}mm LENS / {selectedProduct.dimensions.bridgeWidth}mm BRIDGE</span>
                </div>
              </div>

              {/* Select Frame List */}
              <div className="mt-6">
                <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                  Switch Frame Chassis
                </label>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-full text-left p-2.5 flex items-center justify-between border transition-all ${
                        selectedProduct.id === p.id
                          ? 'border-white bg-white/10'
                          : 'border-white/5 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <span className="font-serif text-sm text-zinc-200">{p.name}</span>
                      <span className="font-mono text-xs text-zinc-400">${p.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  stopCamera();
                  onClose();
                  onSelectForStudio(selectedProduct);
                }}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-3.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                <span>Select for Bespoke Studio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
