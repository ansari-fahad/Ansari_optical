import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { SlidersHorizontal, Eye, Sparkles, ArrowUpRight, Check, Ruler } from 'lucide-react';

interface ProductCatalogProps {
  onSelectProduct: (product: Product) => void;
  onTryOnProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onSelectProduct,
  onTryOnProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredColorway, setHoveredColorway] = useState<{ [productId: string]: string }>({});

  const categories = ['All', 'Square', 'Geometric', 'Cat-Eye', 'Round', 'Rimless'];

  const filteredProducts =
    activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="capsule-collection" className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-16 lg:px-20 bg-[#0c0c0e] text-white border-t border-white/5">
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-20" />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 mb-2.5 sm:mb-3">
              <span>02 / CAPSULE COLLECTION</span>
              <span className="w-8 h-px bg-zinc-700" />
              <span>EDITION 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Architectural <br />
              <span className="italic font-light text-zinc-300">Silhouettes</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Every frame is engineered in Fukui, Japan, combining cold-pressed titanium with hand-cured cellulose acetate. Paired with custom ophthalmic lenses.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-6 sm:mt-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-white text-black font-medium shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="font-mono text-[11px] sm:text-xs text-zinc-500">
            SHOWING {filteredProducts.length} DESIGNS
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const currentColorway =
            hoveredColorway[product.id] || product.colorways[0].name;

          return (
            <div
              key={product.id}
              className="group relative bg-[#121215] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Top metadata tags */}
              <div className="p-5 sm:p-6 flex items-start justify-between relative z-10">
                <div>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-zinc-400 block">
                    {product.code}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-white mt-1 group-hover:text-zinc-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-0.5">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-mono text-sm text-white font-medium">
                    ${product.price}
                  </span>
                  {product.badge && (
                    <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                      {product.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Visual Container with hover zoom & optical shine */}
              <div className="relative aspect-[4/3] w-full bg-[#18181c] overflow-hidden flex items-center justify-center p-4 sm:p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale contrast-125"
                  loading="lazy"
                />

                {/* Subtle lens refraction shine overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

                {/* Fast Action Floating Pills (Touch friendly on mobile, hover on desktop) */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTryOnProduct(product);
                    }}
                    className="flex items-center gap-1.5 bg-black/85 hover:bg-black text-white text-[10px] sm:text-[11px] font-mono uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md transition-colors"
                  >
                    <Eye className="w-3 h-3 text-zinc-300" />
                    <span>Try-On</span>
                  </button>

                  <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] text-zinc-300 bg-black/85 px-2.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                    <Ruler className="w-3 h-3 text-zinc-400" />
                    <span>{product.dimensions.lensWidth}—{product.dimensions.bridgeWidth}—{product.dimensions.templeLength}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Colorway Swatches, Material, CTA */}
              <div className="p-5 sm:p-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  {/* Swatches */}
                  <div className="flex items-center gap-2">
                    {product.colorways.map((c) => (
                      <button
                        key={c.name}
                        onClick={() =>
                          setHoveredColorway((prev) => ({ ...prev, [product.id]: c.name }))
                        }
                        className={`w-4 h-4 rounded-full border transition-all ${
                          currentColorway === c.name
                            ? 'scale-125 border-white ring-2 ring-white/30'
                            : 'border-zinc-700 hover:border-zinc-400'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                        aria-label={c.name}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-[10px] text-zinc-400 truncate max-w-[140px]">
                    {currentColorway}
                  </span>
                </div>

                {/* Primary Button */}
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white text-zinc-200 hover:text-black py-3 rounded-none font-mono text-xs uppercase tracking-widest transition-all duration-300 border border-white/10 hover:border-white group/btn"
                >
                  <span>Configure & Add Lenses</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
