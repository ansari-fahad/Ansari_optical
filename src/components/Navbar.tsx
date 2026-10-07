import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Volume2, VolumeX, Menu, X, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTryOn: () => void;
  onOpenAtelier: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTryOn,
  onOpenAtelier,
  soundEnabled,
  onToggleSound,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#09090b]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <a
          href="#"
          className="group flex items-center gap-3 text-white focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white transition-colors bg-white/5">
            <span className="font-serif text-sm font-light">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg tracking-widest font-normal uppercase leading-none">
              Ansari Optical
            </span>
            <span className="font-mono text-[9px] tracking-widest-xl text-zinc-400 uppercase mt-0.5">
              Haute Lunetterie
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-zinc-300">
          <button
            onClick={() => scrollToSection('scrollytelling-experience')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            The Anatomy
          </button>
          <button
            onClick={() => scrollToSection('capsule-collection')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Collection 2026
          </button>
          <button
            onClick={() => scrollToSection('lens-optics-lab')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Lens Craft
          </button>
          <button
            onClick={() => scrollToSection('editorial-lookbook')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Editorial
          </button>
          <button
            onClick={onOpenAtelier}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-zinc-400 hover:text-white"
          >
            <MapPin className="w-3 h-3 text-zinc-400" />
            Ateliers
          </button>
        </nav>

        {/* Right: Actions (Sound, Try-On, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sound Ambience Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:border-white/40 text-zinc-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Audio Ambience On' : 'Audio Ambience Muted'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-zinc-500" />
            )}
          </button>

          {/* Virtual Try-On Button */}
          <button
            onClick={onOpenTryOn}
            className="hidden sm:inline-flex items-center gap-2 border border-white/20 hover:border-white text-xs font-mono uppercase tracking-widest px-3.5 py-2 rounded-full text-zinc-200 hover:text-white bg-white/5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>Try-On</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 bg-white text-black px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-all shadow-md active:scale-95"
            aria-label="View shopping cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#09090b]/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 font-mono text-sm uppercase tracking-widest text-zinc-300">
            <button
              onClick={() => scrollToSection('scrollytelling-experience')}
              className="text-left py-2 border-b border-white/5 hover:text-white"
            >
              01 / The Anatomy
            </button>
            <button
              onClick={() => scrollToSection('capsule-collection')}
              className="text-left py-2 border-b border-white/5 hover:text-white"
            >
              02 / Collection 2026
            </button>
            <button
              onClick={() => scrollToSection('lens-optics-lab')}
              className="text-left py-2 border-b border-white/5 hover:text-white"
            >
              03 / Lens Craft Lab
            </button>
            <button
              onClick={() => scrollToSection('editorial-lookbook')}
              className="text-left py-2 border-b border-white/5 hover:text-white"
            >
              04 / Editorial Muses
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAtelier();
              }}
              className="text-left py-2 border-b border-white/5 hover:text-white flex items-center justify-between"
            >
              <span>05 / Private Ateliers</span>
              <span className="text-xs text-zinc-500">5 CITIES</span>
            </button>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTryOn();
              }}
              className="w-full flex items-center justify-center gap-2 border border-white/20 py-3 rounded-full font-mono text-xs uppercase tracking-widest text-white"
            >
              <Eye className="w-4 h-4" /> Virtual Try-On Mirror
            </button>
            <button
              onClick={onToggleSound}
              className="w-full flex items-center justify-center gap-2 border border-white/10 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest text-zinc-400"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" /> Ambience Sound On
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-zinc-500" /> Ambience Sound Muted
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
