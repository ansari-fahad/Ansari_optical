import React from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ArrowUpRight, Sparkles, Quote } from 'lucide-react';

interface LookbookSectionProps {
  onShopProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onShopProduct,
}) => {
  return (
    <section id="editorial-lookbook" className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#070709] text-white border-t border-white/5">
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-25" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-white/10 pb-6 sm:pb-8 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 mb-2.5 sm:mb-3">
              <span>04 / AUTUMN-WINTER EDITORIAL</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span>THE FEMININE GAZE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              The Muse <br />
              <span className="italic font-light text-zinc-300">Chronicles</span>
            </h2>
          </div>

          <div className="max-w-md">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 mb-2" />
            <p className="font-serif text-base sm:text-lg italic text-zinc-300">
              "Ansari Optical treats eyewear not as medical prosthetics, but as facial architecture that transforms how a woman perceives and commands the room."
            </p>
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 mt-2">
              — L’OFFICIEL PARIS, AUTUMN EDITION
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Lookbook Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Large Left Campaign Feature */}
          <div className="lg:col-span-7 group relative bg-[#111114] border border-white/10 overflow-hidden">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src="/images/muse_portrait.jpg"
                alt="Ansari Muse Lookbook 01"
                className="w-full h-full object-cover filter grayscale contrast-120 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating hotspot pill */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-400 block">
                    LOOK 01 / PARIS RUNWAY
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                    Model V-88 Kage
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-0.5 sm:mt-1">
                    High-brow sculpted acetate in Onyx Polish.
                  </p>
                </div>

                <button
                  onClick={() => onShopProduct(PRODUCTS[2])}
                  className="bg-white text-black px-4 sm:px-5 py-2.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl shrink-0 self-start sm:self-auto"
                >
                  <span>Acquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 2 Stacked Features */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Feature 2: Side Profile Titanium */}
            <div className="group relative bg-[#111114] border border-white/10 overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/images/muse_side.jpg"
                  alt="Ansari Muse Lookbook 02"
                  className="w-full h-full object-cover filter grayscale contrast-120 group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-400 block">
                      LOOK 02 / MINIMALIST WIRE
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-white">
                      Model A-204 Sora
                    </h3>
                  </div>

                  <button
                    onClick={() => onShopProduct(PRODUCTS[1])}
                    className="bg-white text-black px-3.5 sm:px-4 py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition-all shadow-lg shrink-0 self-start sm:self-auto"
                  >
                    <span>Acquire</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Feature 3: Atelier Heritage */}
            <div className="relative bg-[#111114] border border-white/10 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video w-full overflow-hidden mb-5 sm:mb-6 border border-white/5">
                  <img
                    src="/images/atelier_workshop.jpg"
                    alt="Fukui Atelier"
                    className="w-full h-full object-cover filter grayscale contrast-125"
                    loading="lazy"
                  />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-400 block">
                  HERITAGE / FUKUI CRAFTSMANSHIP
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-white mt-1">
                  Seventy-Two Hours of Polishing
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed mt-2">
                  Each frame undergoes continuous tumbling in bamboo chips and natural wax barrels, followed by hand-buffing by third-generation optical masters.
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-500">
                <span>BATCH CODE: ANS-2026-W</span>
                <span className="text-zinc-300">LIMITED ALLOCATION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
