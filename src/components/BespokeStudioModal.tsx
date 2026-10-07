import React, { useState } from 'react';
import { Product, LensOption, PrescriptionDetails } from '../types';
import { LENS_OPTIONS } from '../data/products';
import { X, Check, ShieldCheck, Sparkles, Sliders, Info, Glasses } from 'lucide-react';

interface BespokeStudioModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedColorway: string,
    selectedLens: LensOption,
    prescription: PrescriptionDetails
  ) => void;
}

export const BespokeStudioModal: React.FC<BespokeStudioModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedColorway, setSelectedColorway] = useState<string>(
    product.colorways[0].name
  );
  const [selectedLens, setSelectedLens] = useState<LensOption>(LENS_OPTIONS[0]);
  const [rxType, setRxType] = useState<PrescriptionDetails['type']>('non-prescription');
  const [odSphere, setOdSphere] = useState<string>('-1.50');
  const [osSphere, setOsSphere] = useState<string>('-1.75');
  const [pd, setPd] = useState<string>('63');
  const [engraving, setEngraving] = useState<string>('');

  const totalPrice = product.price + selectedLens.price;

  const handleConfirm = () => {
    onAddToCart(product, selectedColorway, selectedLens, {
      type: rxType,
      odSphere: rxType !== 'non-prescription' ? odSphere : undefined,
      osSphere: rxType !== 'non-prescription' ? osSphere : undefined,
      pupillaryDistance: rxType !== 'non-prescription' ? pd : undefined,
      engravingText: engraving.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0e0e11] border border-white/10 shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">
              ATELIER CUSTOMIZER / FUKUI LAB
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              Bespoke Fitting: {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[75vh] overflow-y-auto">
          {/* Left Column: Visual Preview & Specs */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#131317] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
            <div>
              <div className="relative aspect-square w-full bg-[#18181d] flex items-center justify-center overflow-hidden border border-white/5 mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] font-mono text-zinc-300">
                  {selectedColorway}
                </div>
              </div>

              <h4 className="font-serif text-lg text-white mb-2">Chassis Integrity</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                {product.description}
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4 font-mono text-[11px] text-zinc-400">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Lens Width / Bridge:</span>
                  <span>{product.dimensions.lensWidth}mm / {product.dimensions.bridgeWidth}mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Temple Length:</span>
                  <span>{product.dimensions.templeLength}mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Weight:</span>
                  <span>{product.weight}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Includes 2-Year Atelier Warranty & Solid Milled Case</span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-8">
            {/* Step 1: Acetate Colorway */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-zinc-300 mb-3">
                1. Select Frame Finish
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {product.colorways.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorway(c.name)}
                    className={`flex items-center gap-3 p-3 text-left border transition-all ${
                      selectedColorway === c.name
                        ? 'border-white bg-white/10'
                        : 'border-white/10 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-mono text-xs text-zinc-200">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Optical Lens Technology */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-mono text-xs uppercase tracking-widest text-zinc-300">
                  2. Select Lens Technology
                </label>
                <span className="font-mono text-[10px] text-zinc-500">OPHTHALMIC GRADE</span>
              </div>

              <div className="space-y-2.5">
                {LENS_OPTIONS.map((lens) => (
                  <button
                    key={lens.id}
                    onClick={() => setSelectedLens(lens)}
                    className={`w-full text-left p-3.5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      selectedLens.id === lens.id
                        ? 'border-white bg-white/10'
                        : 'border-white/10 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    <div className="max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm text-white font-medium">
                          {lens.name}
                        </span>
                        {lens.highlight && (
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/15 text-zinc-300">
                            {lens.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light mt-1">
                        {lens.description}
                      </p>
                    </div>

                    <div className="font-mono text-xs font-semibold text-zinc-200 shrink-0">
                      {lens.price === 0 ? 'INCLUDED' : `+$${lens.price}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Prescription Details */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-zinc-300 mb-3">
                3. Prescription Requirements
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {[
                  { id: 'non-prescription', label: 'Fashion / Plano' },
                  { id: 'single-vision', label: 'Single Vision' },
                  { id: 'progressive', label: 'Progressive' },
                  { id: 'upload-later', label: 'Send Later' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRxType(item.id as PrescriptionDetails['type'])}
                    className={`p-2.5 text-center font-mono text-[11px] uppercase border transition-all ${
                      rxType === item.id
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/10 hover:border-white/30 bg-white/5 text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Rx Input Fields if Single Vision or Progressive */}
              {(rxType === 'single-vision' || rxType === 'progressive') && (
                <div className="p-4 bg-white/5 border border-white/10 space-y-3 font-mono text-xs">
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Enter your verified optometrist sphere values:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-zinc-500 block mb-1">OD (RIGHT EYE)</span>
                      <input
                        type="text"
                        value={odSphere}
                        onChange={(e) => setOdSphere(e.target.value)}
                        placeholder="-2.00"
                        className="w-full bg-[#09090b] border border-white/20 p-2 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block mb-1">OS (LEFT EYE)</span>
                      <input
                        type="text"
                        value={osSphere}
                        onChange={(e) => setOsSphere(e.target.value)}
                        placeholder="-2.25"
                        className="w-full bg-[#09090b] border border-white/20 p-2 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 block mb-1">PD (MM)</span>
                      <input
                        type="text"
                        value={pd}
                        onChange={(e) => setPd(e.target.value)}
                        placeholder="63"
                        className="w-full bg-[#09090b] border border-white/20 p-2 text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {rxType === 'upload-later' && (
                <div className="p-3 bg-white/5 border border-white/10 text-xs text-zinc-400 font-light">
                  You can proceed now. Our master opticians will reach out via WhatsApp or email to confirm your optical scan or doctor prescription before edging lenses.
                </div>
              )}
            </div>

            {/* Step 4: Bespoke Laser Engraving */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-zinc-300 mb-2">
                4. Atelier Temple Micro-Engraving (Complimentary)
              </label>
              <input
                type="text"
                maxLength={10}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                placeholder="YOUR INITIALS (E.G. 'A.N.')"
                className="w-full bg-white/5 border border-white/15 p-3 text-white font-mono text-xs uppercase placeholder:text-zinc-600 focus:outline-none focus:border-white tracking-widest"
              />
              <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                MAX 10 CHARACTERS · LASER ENGRAVED ON INNER LEFT TITANIUM CORE
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer with Price Summary and Add to Bag */}
        <div className="p-6 sm:p-8 bg-[#09090b] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase text-zinc-500 block">
              TOTAL ESTIMATE (FRAME + OPHTHALMIC LENSES)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-white font-normal">
                ${totalPrice}
              </span>
              <span className="font-mono text-xs text-zinc-400">USD</span>
              <span className="font-mono text-[11px] text-zinc-500 ml-2">
                (Free Insured Express Delivery)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-6 py-3.5 border border-white/15 hover:border-white text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="w-1/2 sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl"
            >
              Add to Bespoke Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
