import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag, Plus, Minus, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: (discountAmount: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => {
    const unitPrice = item.product.price + item.selectedLens.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'MUSE10' || clean === 'ARTISAN10') {
      setDiscountPercent(10);
      setPromoMessage('10% Editorial Privilege Applied');
    } else if (clean === 'VIP20') {
      setDiscountPercent(20);
      setPromoMessage('20% Atelier VIP Privilege Applied');
    } else {
      setPromoMessage('Code not recognized. Try MUSE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#0e0e12] border-l border-white/10 shadow-2xl flex flex-col justify-between text-white">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-zinc-400" />
              <h2 className="font-serif text-xl tracking-wide uppercase">
                Bespoke Bag ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">
                  Your Bag is Empty
                </h3>
                <p className="text-xs text-zinc-400 font-light max-w-xs mb-6">
                  Explore our architectural eyewear and customize your tailored ophthalmic lenses.
                </p>
                <button
                  onClick={onClose}
                  className="bg-white text-black px-6 py-3 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal =
                  (item.product.price + item.selectedLens.price) * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4 bg-white/5 border border-white/10 flex gap-4 relative group"
                  >
                    {/* Visual */}
                    <div className="w-20 h-20 bg-[#16161a] border border-white/5 overflow-hidden shrink-0 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover filter grayscale contrast-125"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-base text-white truncate">
                            {item.product.name}
                          </h4>
                          <p className="font-mono text-[10px] text-zinc-400 uppercase">
                            {item.selectedColorway}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Lens Spec Badge */}
                      <div className="mt-2 text-[11px] font-mono text-zinc-300 bg-white/5 p-1.5 border border-white/5">
                        <span className="text-zinc-400 block text-[9px]">LENS SELECTION:</span>
                        <span className="truncate block font-medium">
                          {item.selectedLens.name} ({item.selectedLens.price === 0 ? 'Included' : `+$${item.selectedLens.price}`})
                        </span>
                        {item.prescription.type !== 'non-prescription' && (
                          <span className="text-emerald-400 text-[10px] block mt-0.5">
                            Rx: OD {item.prescription.odSphere} / OS {item.prescription.osSphere} (PD {item.prescription.pupillaryDistance}mm)
                          </span>
                        )}
                        {item.prescription.engravingText && (
                          <span className="text-zinc-400 text-[9px] block">
                            Engraving: "{item.prescription.engravingText}"
                          </span>
                        )}
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-white/15">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white/10 text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white/10 text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm text-white font-medium">
                          ${itemTotal} USD
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0a0a0c] space-y-4">
              {/* Promo code form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE (TRY: MUSE10)"
                  className="flex-1 bg-white/5 border border-white/15 px-3 py-2 text-xs font-mono uppercase text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="bg-white/10 hover:bg-white text-zinc-200 hover:text-black px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className="text-[11px] font-mono text-emerald-400">
                  {promoMessage}
                </p>
              )}

              {/* Cost breakdown */}
              <div className="space-y-1.5 font-mono text-xs border-t border-white/10 pt-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${rawSubtotal} USD</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span>-${discountAmount} USD</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Insured DHL Express Shipping</span>
                  <span className="text-white">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-base text-white font-medium border-t border-white/10 pt-2 font-serif">
                  <span>Final Total</span>
                  <span>${finalTotal} USD</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => onOpenCheckout(discountAmount)}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>256-BIT ENCRYPTED · FREE ATELIER RESIZING · 30-DAY RETURNS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
