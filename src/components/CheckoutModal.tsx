import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, CheckCircle, ShieldCheck, Lock, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  items: CartItem[];
  discountAmount: number;
  onClose: () => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  discountAmount,
  onClose,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'klarna'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [name, setName] = useState('Elena Vance');
  const [email, setEmail] = useState('elena.vance@studio-paris.fr');
  const [address, setAddress] = useState('14 Rue de Turenne');
  const [city, setCity] = useState('Paris');
  const [postal, setPostal] = useState('75004');
  const [country, setCountry] = useState('France');

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.product.price + item.selectedLens.price) * item.quantity;
  }, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `ANS-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderNumber(generatedOrder);
    setStep('success');
    onClearCart();

    // Trigger luxury celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#d4d4d8', '#a1a1aa'],
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0e0e12] border border-white/10 shadow-2xl text-white my-2 sm:my-8 max-h-[96dvh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h2 className="font-serif text-lg sm:text-2xl text-white">
              {step === 'form' ? 'Atelier Secure Checkout' : 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handlePlaceOrder} className="p-4 sm:p-8 space-y-5 sm:space-y-6 flex-1 overflow-y-auto">
            {/* Express 1-Click Payment Row */}
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 block mb-2">
                EXPRESS ATELIER PAYMENT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 border text-center font-mono text-xs uppercase tracking-wider transition-all ${
                    paymentMethod === 'apple-pay'
                      ? 'border-white bg-white text-black font-semibold'
                      : 'border-white/10 hover:border-white/30 bg-white/5 text-zinc-300'
                  }`}
                >
                   Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 border text-center font-mono text-xs uppercase tracking-wider transition-all ${
                    paymentMethod === 'card'
                      ? 'border-white bg-white text-black font-semibold'
                      : 'border-white/10 hover:border-white/30 bg-white/5 text-zinc-300'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`py-2.5 sm:py-3 px-3 sm:px-4 border text-center font-mono text-xs uppercase tracking-wider transition-all ${
                    paymentMethod === 'klarna'
                      ? 'border-white bg-white text-black font-semibold'
                      : 'border-white/10 hover:border-white/30 bg-white/5 text-zinc-300'
                  }`}
                >
                  Klarna (4x ${(total / 4).toFixed(0)})
                </button>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-3.5 sm:space-y-4">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-400 block">
                DELIVERY RECIPIENT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Email for Optical Certificate"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
              </div>

              <input
                type="text"
                required
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Postal Code"
                  value={postal}
                  onChange={(e) => setPostal(e.target.value)}
                  className="bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-white/5 border border-white/15 p-2.5 sm:p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Payment Card details if Credit Card selected */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 p-4 bg-white/5 border border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block">
                  CARD INFORMATION
                </span>
                <input
                  type="text"
                  placeholder="Card Number (•••• •••• •••• 4242)"
                  defaultValue="4242 •••• •••• 9104"
                  className="w-full bg-[#09090b] border border-white/20 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    defaultValue="08 / 28"
                    className="bg-[#09090b] border border-white/20 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    defaultValue="891"
                    className="bg-[#09090b] border border-white/20 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
            )}

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase block">
                  TOTAL CHARGE (TAXES & SHIPPING INCLUDED)
                </span>
                <span className="font-serif text-3xl text-white font-normal">
                  ${total} USD
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-widest font-semibold transition-all hover:scale-105 active:scale-95 shadow-2xl"
              >
                Authorize & Commission Piece
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block">
                COMMISSION REGISTERED
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                Thank You, {name}
              </h3>
              <p className="font-mono text-sm text-zinc-400 mt-2">
                Order Reference: <span className="text-white font-semibold">{orderNumber}</span>
              </p>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-md mx-auto leading-relaxed">
              Your bespoke eyewear has entered the Fukui atelier queue. Our master opticians will hand-inspect the lenses and pack your piece in our milled aluminum storage case.
            </p>

            <div className="p-4 bg-white/5 border border-white/10 max-w-sm mx-auto font-mono text-xs text-zinc-400 space-y-1">
              <div>DISPATCH: WITHIN 48 HOURS VIA DHL EXPRESS</div>
              <div>INSURANCE: 100% COVERED WORLDWIDE</div>
              <div>CONFIRMATION SENT TO: {email}</div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-white text-black px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-colors"
              >
                Return to Gallery
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
