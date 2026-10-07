import React, { useState } from 'react';
import { ATELIER_LOCATIONS } from '../data/products';
import { X, Calendar, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';

interface AtelierBookingModalProps {
  onClose: () => void;
}

export const AtelierBookingModal: React.FC<AtelierBookingModalProps> = ({ onClose }) => {
  const [selectedCity, setSelectedCity] = useState(ATELIER_LOCATIONS[0].city);
  const [service, setService] = useState('Facial Architecture & Frame Fitting');
  const [date, setDate] = useState('2026-10-15');
  const [time, setTime] = useState('14:30');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const activeAtelier = ATELIER_LOCATIONS.find((a) => a.city === selectedCity) || ATELIER_LOCATIONS[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0e0e12] border border-white/10 shadow-2xl text-white my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-zinc-300" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block">
                FLAGSHIP RESERVATIONS
              </span>
              <h2 className="font-serif text-2xl text-white">
                Private Atelier Consultation
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isBooked ? (
          <form onSubmit={handleBooking} className="p-6 sm:p-8 space-y-6">
            {/* City Selector Tabs */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                1. Select Flagship Atelier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ATELIER_LOCATIONS.map((loc) => (
                  <button
                    key={loc.city}
                    type="button"
                    onClick={() => setSelectedCity(loc.city)}
                    className={`py-2 px-3 border text-center font-mono text-xs uppercase transition-all ${
                      selectedCity === loc.city
                        ? 'border-white bg-white text-black font-semibold'
                        : 'border-white/10 hover:border-white/30 bg-white/5 text-zinc-400'
                    }`}
                  >
                    {loc.city}
                  </button>
                ))}
              </div>

              {/* Atelier Details Card */}
              <div className="mt-3 p-4 bg-white/5 border border-white/10 font-mono text-xs text-zinc-400 space-y-1">
                <div className="text-white font-medium">{activeAtelier.district}</div>
                <div>{activeAtelier.address}</div>
                <div className="text-zinc-500">{activeAtelier.hours} · Host: {activeAtelier.leadOptometrist}</div>
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2">
                2. Consultation Experience
              </label>
              <div className="space-y-2">
                {[
                  {
                    title: 'Facial Architecture & Frame Fitting (45 Min)',
                    desc: 'Digital caliper facial scanning, bone structure analysis, and curated frame styling with an optical architect.',
                  },
                  {
                    title: 'Comprehensive Corneal & Refraction Exam (60 Min)',
                    desc: 'Wavefront corneal topography, pupillary alignment, and precision lens prescription determination.',
                  },
                  {
                    title: 'Bespoke Custom Monolith Commission (90 Min)',
                    desc: 'Co-design a one-off frame carved from custom cured acetate blocks with master Japanese opticians.',
                  },
                ].map((s) => (
                  <label
                    key={s.title}
                    className={`block p-3 border cursor-pointer transition-all ${
                      service === s.title
                        ? 'border-white bg-white/10'
                        : 'border-white/10 hover:border-white/20 bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="service"
                        checked={service === s.title}
                        onChange={() => setService(s.title)}
                        className="accent-white"
                      />
                      <span className="font-serif text-sm text-white">{s.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light mt-1 pl-5">
                      {s.desc}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase text-zinc-400 mb-1">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#0e0e12] border border-white/15 p-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
                >
                  <option value="11:30">11:30 AM</option>
                  <option value="14:30">02:30 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="18:00">06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Guest contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-white/5 border border-white/15 p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="bg-white/5 border border-white/15 p-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-500">
                COMPLIMENTARY PRIVATE CONSULTATION
              </span>
              <button
                type="submit"
                className="bg-white text-black px-8 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Confirm Appointment
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
                ATELIER APPOINTMENT RESERVED
              </span>
              <h3 className="font-serif text-3xl text-white mt-1">
                We Await Your Visit, {guestName || 'Valued Guest'}
              </h3>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 max-w-md mx-auto font-mono text-xs text-zinc-300 space-y-1.5 text-left">
              <div><span className="text-zinc-500">FLAGSHIP:</span> {activeAtelier.city} ({activeAtelier.district})</div>
              <div><span className="text-zinc-500">DATE & TIME:</span> {date} at {time}</div>
              <div><span className="text-zinc-500">EXPERIENCE:</span> {service}</div>
              <div><span className="text-zinc-500">ADDRESS:</span> {activeAtelier.address}</div>
            </div>

            <p className="text-xs text-zinc-400 font-light max-w-sm mx-auto">
              A private calendar invitation with boutique concierge directions has been dispatched to {guestEmail || 'your email'}.
            </p>

            <button
              onClick={onClose}
              className="bg-white text-black px-8 py-3 font-mono text-xs uppercase tracking-widest font-medium hover:bg-zinc-200 transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
