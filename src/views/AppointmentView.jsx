import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User, CheckCircle2, Sparkles, Send } from 'lucide-react';

export default function AppointmentView({ storeConfig, onShowToast }) {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [formData, setFormData] = useState({
    name: "Radhika Sharma",
    phone: "9876543210",
    email: "radhika@example.com",
    date: "2026-11-28",
    time: "3:00 PM",
    guests: "2 Guests",
    notes: "Looking for bridal choker and matching kada set."
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const selectedBoutique = storeConfig.boutiques.find((b) => b.city === selectedCity) || storeConfig.boutiques[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);
    onShowToast("✨ Salon reservation confirmed! A calendar invite has been dispatched.");
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full animate-fade-in">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP PRIVATE SALON CONSULTATION</span>
        </span>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#29251F] font-normal">
          Book Your Private Atelier Session
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5348] mt-2 font-light">
          Enjoy complimentary champagne hospitality, personal gemologist styling, and private trousseau curation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Boutique Salons (col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-editorial text-2xl font-normal text-[#29251F] mb-3">
            Select Flagship Salon
          </h3>

          {storeConfig.boutiques.map((b) => {
            const isSelected = selectedCity === b.city;
            return (
              <div
                key={b.city}
                onClick={() => setSelectedCity(b.city)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#FAF7F2] border-[#C6A46A] ring-1 ring-[#C6A46A] shadow-md"
                    : "bg-white border-[#E9DED1] hover:bg-[#FAF7F2]"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm text-[#29251F] mb-1">
                  <span>{b.city}</span>
                  {isSelected && <span className="text-[10px] bg-[#C6A46A] text-white px-2 py-0.5 rounded">Selected</span>}
                </div>
                <h5 className="font-editorial text-lg text-[#29251F] font-medium">{b.salon}</h5>
                <p className="text-xs text-[#5A5348] mt-1 font-light leading-snug">{b.address}</p>
                <div className="flex items-center gap-4 mt-3 pt-2 border-t border-[#E9DED1]/70 text-[11px] text-[#958878]">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#C6A46A]" /> {b.hours}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Booking Form (col-span-7) */}
        <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 shadow-luxury">
          {bookingConfirmed ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#1B4332] text-white flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-editorial text-3xl text-[#29251F]">Reservation Confirmed</h3>
              <p className="text-xs text-[#5A5348] max-w-sm mx-auto font-light leading-relaxed">
                We look forward to welcoming you at our <strong>{selectedBoutique.salon}</strong> in {selectedCity} on <strong>{formData.date} at {formData.time}</strong>.
              </p>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#C6A46A] text-white text-xs font-semibold uppercase tracking-widest"
              >
                Book Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-editorial text-2xl font-normal text-[#29251F] pb-2 border-b border-[#E9DED1]">
                Your Reservation Details
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#958878] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#958878] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#958878] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#958878] mb-1">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  >
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="2:00 PM">2:00 PM (Afternoon)</option>
                    <option value="3:00 PM">3:00 PM (Tea Service)</option>
                    <option value="5:30 PM">5:30 PM (Evening Privé)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">Styling Notes / Trousseau Requirements</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe the occasion, preferred silhouettes, or outfit colors..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#29251F] hover:bg-[#3D3830] text-[#F5F0E7] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C6A46A]" />
                <span>Confirm Private Appointment</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
