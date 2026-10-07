import React, { useState } from 'react';
import { Eye, Shield, Sparkles, Zap, Award, Layers } from 'lucide-react';

export const LensCraftSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      title: '01 / Diamond Hydrophobic & Oleophobic Shield',
      subtitle: 'Surface Nanotech',
      description: 'An ultra-slick fluoropolymer matrix that creates a 115° contact angle. Sweat, cosmetic oils, raindrops, and fingerprints slide off without wiping, eliminating microscopic micro-scratches.',
      metric: '115° CONTACT ANGLE',
    },
    {
      title: '02 / 8-Layer Dual Anti-Reflective Ion Vacuum',
      subtitle: 'Optical Transparency',
      description: 'Vacuum-deposited zirconium and silicon oxides that neutralize stray ambient reflections. Yields an astonishing 99.8% light transmittance, making lenses appear virtually invisible to the beholder.',
      metric: '99.8% LIGHT TRANSMISSION',
    },
    {
      title: '03 / Chroma-Pure Blue-Light Filter Matrix',
      subtitle: 'Circadian Defense',
      description: 'Selectively attenuates toxic high-energy visible light (415nm–455nm) emitted from OLED displays, preventing digital retinal strain and insomnia while preserving natural warm skin tones.',
      metric: '415–455NM BAND STOP',
    },
    {
      title: '04 / 1.74 Ultra-Dense High-Refractive Polymer',
      subtitle: 'Zero Distortion Core',
      description: 'The thinnest and lightest optical polymer ever synthesized. Aspheric geometry eliminates perimeter distortion and edge-thickening, allowing your natural eye beauty to shine through.',
      metric: '1.74 ABBE REFRACTIVE INDEX',
    },
  ];

  return (
    <section id="lens-optics-lab" className="relative w-full py-28 px-6 sm:px-12 md:px-20 bg-[#09090b] text-white border-t border-white/5">
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-25" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-3">
              <span>03 / OPHTHALMIC LABORATORY</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span>FUKUI PRECISION</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              The Architecture of <br />
              <span className="italic font-light text-zinc-300">Pure Clarity</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-zinc-400 font-light leading-relaxed">
            The world is meant to be experienced without glare, haze, or distortion. Each Ansari lens is custom diamond-edged to match your individual pupillary distance.
          </p>
        </div>

        {/* Interactive Lens Strata Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Macro Lens Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full bg-[#121215] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="/images/lens_craft.jpg"
                alt="Ansari 1.74 High Index Lens on Basalt"
                className="w-full h-full object-cover filter contrast-125"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Label */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase block">SPECIFICATION</span>
                  <span className="text-white font-medium">VISIO 1.74 AS-DIAMOND</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase block">EDGE FINISH</span>
                  <span className="text-white font-medium">FACETED CRYSTAL BEVEL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layer Interactive Tabs */}
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-white" />
              <span>EXPLORE THE 4-STRATA COATING MATRIX</span>
            </p>

            {layers.map((layer, idx) => (
              <div
                key={layer.title}
                onClick={() => setActiveLayer(idx)}
                className={`p-6 border transition-all duration-300 cursor-pointer ${
                  activeLayer === idx
                    ? 'border-white bg-[#15151a] shadow-xl'
                    : 'border-white/5 hover:border-white/20 bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-white">
                    {layer.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase text-zinc-400 bg-white/5 px-2 py-0.5 border border-white/10">
                    {layer.metric}
                  </span>
                </div>

                <p className="font-mono text-[11px] text-zinc-400 mt-1 uppercase">
                  {layer.subtitle}
                </p>

                {activeLayer === idx && (
                  <p className="mt-4 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed animate-in fade-in duration-300">
                    {layer.description}
                  </p>
                )}
              </div>
            ))}

            <div className="pt-6 flex items-center justify-between text-xs font-mono text-zinc-500 border-t border-white/10">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Award className="w-4 h-4 text-white" /> ISO 8980-3 OPHTHALMIC CERTIFIED
              </span>
              <span>100% UV400 LAB TESTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
