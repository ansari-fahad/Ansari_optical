import React from 'react';
import { ArrowDown, Sparkles, Glasses, Eye, Compass } from 'lucide-react';

interface HeroProps {
  onScrollToStory: () => void;
  onOpenVirtualTryOn: () => void;
  onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToStory,
  onOpenVirtualTryOn,
  onExploreCollection,
}) => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#09090b] text-white overflow-hidden border-b border-white/5">
      {/* Background Architectural Grid Lines & Subtle Grain */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-30" />
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top Editorial Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400">
            AUTUMN / WINTER 2026 CAPSULE
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-zinc-400" /> FUKUI, JAPAN ATELIER
          </span>
          <span className="hidden md:inline">EDITION OF 500 PIECES</span>
          <span className="text-zinc-300 font-medium">EST. 1994</span>
        </div>
      </div>

      {/* Center Monumental Editorial Brand Header */}
      <div className="relative z-10 my-auto py-8 sm:py-12">
        <div className="max-w-6xl">
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest-xl sm:tracking-widest-2xl text-zinc-400 mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
            <span>[ HAUTE LUNETTERIE ]</span>
            <span className="w-8 sm:w-12 h-px bg-zinc-700 inline-block" />
            <span>ARTISTIC OPTICAL FORMS</span>
          </p>

          <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-normal tracking-tight text-white leading-[0.94] sm:leading-[0.92] select-none">
            ANSARI <br />
            <span className="italic font-light text-zinc-300 tracking-normal">
              OPTICAL
            </span>
          </h1>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end">
            <div className="md:col-span-6">
              <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                Eyewear conceived as kinetic sculpture. Precision-milled Japanese cellulose acetate and beta-titanium architectures, engineered for women who see the world in high definition.
              </p>
            </div>

            <div className="md:col-span-6 flex flex-col sm:flex-row items-stretch sm:items-center md:justify-end gap-3 w-full">
              <button
                onClick={onExploreCollection}
                className="group inline-flex items-center justify-center gap-3 bg-white text-black px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
              >
                <Glasses className="w-4 h-4" />
                <span>Explore Capsule</span>
              </button>

              <button
                onClick={onOpenVirtualTryOn}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white px-5 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest bg-black/40 backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-zinc-300" />
                <span>Virtual Try-On</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Metas & Scroll Invitation */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 border-t border-white/10 pt-5 sm:pt-6">
        <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-8 text-xs font-mono text-zinc-500">
          <div>
            <span className="text-zinc-600 block text-[9px] sm:text-[10px]">LENS CLARITY</span>
            <span className="text-zinc-300 font-medium text-[11px] sm:text-xs">99.8% TRANSMITTANCE</span>
          </div>
          <div>
            <span className="text-zinc-600 block text-[9px] sm:text-[10px]">CHASSIS WEIGHT</span>
            <span className="text-zinc-300 font-medium text-[11px] sm:text-xs">11G – 24G FEATHER</span>
          </div>
          <div className="hidden lg:block">
            <span className="text-zinc-600 block text-[9px] sm:text-[10px]">HINGE LIFETIME</span>
            <span className="text-zinc-300 font-medium text-[11px] sm:text-xs">50,000 CYCLES TESTED</span>
          </div>
        </div>

        <button
          onClick={onScrollToStory}
          className="group flex items-center justify-between sm:justify-start gap-3 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px]">
            Deconstruct The Monolith
          </span>
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:translate-y-1 transition-all shrink-0">
            <ArrowDown className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </section>
  );
};
