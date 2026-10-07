import React, { useState } from 'react';
import { Compass, ShieldCheck, Mail, ArrowUpRight, Sparkles, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] text-white border-t border-white/10 pt-16 sm:pt-20 pb-10 sm:pb-12 px-4 sm:px-8 md:px-16 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-20" />

      <div className="max-w-7xl mx-auto">
        {/* Top Manifesto & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400 block mb-2 sm:mb-3">
              THE ANSARI MANIFESTO
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-tight">
              We design eyewear not as a shield to hide behind, but as an architectural frame for how you illuminate the world.
            </h3>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-xl">
              From our studio workshops in Fukui, Japan to the salons of Paris, each pair is cut from continuous cellulose acetate blocks and tuned to the millimeter.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300 block mb-2">
                Join the Private Circle
              </span>
              <p className="text-xs text-zinc-400 font-light mb-4">
                Receive private invitations to limited batch drops, optical design monographs, and atelier salon gatherings.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL"
                    className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-xs font-mono uppercase text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="bg-white text-black hover:bg-zinc-200 px-6 py-3 font-mono text-xs uppercase tracking-widest font-semibold transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-white/5 border border-white/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Welcome to the Ansari Optical Circle.
                </div>
              )}
            </div>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6 font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
              <span>VOGUE EYEWEAR 2026</span>
              <span>•</span>
              <span>WALLPAPER* DESIGN AWARD</span>
              <span>•</span>
              <span>ELLE STYLE</span>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Service Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-10 sm:py-12 border-b border-white/10 text-xs font-mono">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
              COLLECTIONS
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#capsule-collection" className="hover:text-white transition-colors">Model G-100 Monolith</a></li>
              <li><a href="#capsule-collection" className="hover:text-white transition-colors">Model A-204 Sora Titan</a></li>
              <li><a href="#capsule-collection" className="hover:text-white transition-colors">Model V-88 Kage Cat-Eye</a></li>
              <li><a href="#capsule-collection" className="hover:text-white transition-colors">Model O-12 Lucid Rimless</a></li>
              <li><a href="#capsule-collection" className="hover:text-white transition-colors">Model L-07 Raw Bone Panto</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
              OPHTHALMIC LAB
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#lens-optics-lab" className="hover:text-white transition-colors">1.74 High Index Lenses</a></li>
              <li><a href="#lens-optics-lab" className="hover:text-white transition-colors">Chroma-Pure Blue-Light</a></li>
              <li><a href="#lens-optics-lab" className="hover:text-white transition-colors">Photochromic Transition</a></li>
              <li><a href="#lens-optics-lab" className="hover:text-white transition-colors">Diamond Anti-Reflective</a></li>
              <li><a href="#lens-optics-lab" className="hover:text-white transition-colors">Prescription Verification</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
              PRIVATE ATELIERS
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>Tokyo — Minami-Aoyama</li>
              <li>Paris — Le Marais</li>
              <li>New York — SoHo</li>
              <li>London — Mayfair</li>
              <li>Milan — Montenapoleone</li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-4">
              ATELIER PROMISES
            </span>
            <ul className="space-y-2 text-zinc-400">
              <li>Lifetime Hinge Calibration</li>
              <li>Complimentary Ultrasonic Care</li>
              <li>Carbon Neutral Delivery</li>
              <li>2-Year Complete Warranty</li>
              <li>30-Day Aesthetic Trial</li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500 text-center sm:text-left">
          <div>
            © 2026 ANSARI OPTICAL HAUTE LUNETTERIE. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-6">
            <button
              onClick={scrollToTop}
              className="text-zinc-400 hover:text-white transition-colors uppercase tracking-widest text-[11px] flex items-center gap-1.5"
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
