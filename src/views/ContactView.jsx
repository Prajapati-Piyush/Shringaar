import React, { useState } from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Send,
  Calendar,
  MessageCircle
} from 'lucide-react';

export default function ContactView({ storeConfig, onShowToast }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    inquiryType: "Bespoke Bridal Styling",
    boutique: "Mumbai Flagship (Colaba)",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      onShowToast("Please fill in your name, phone, and email.");
      return;
    }

    setSubmitted(true);
    onShowToast("✨ Thank you! Our Royal Concierge will contact you within 2 business hours.");

    // WhatsApp quick backup option
    const text = `👑 *CONCIERGE INQUIRY: ${storeConfig.brandName}*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email}
• Topic: ${formData.inquiryType}
• Preferred Boutique: ${formData.boutique}
• Notes: ${formData.message || "Looking for consultation"}`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col w-full bg-[#F5F0E7] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#C6A46A] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AT YOUR SERVICE</span>
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#29251F] tracking-tight">
            Connect With Our Concierge
          </h1>
          <p className="text-xs sm:text-sm text-[#958878] mt-2 font-light">
            Whether for bespoke bridal trousseau consultations, salon appointments, or craftsmanship inquiries, our stylists await.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-10 shadow-luxury">
            
            <div className="mb-8">
              <h2 className="font-editorial text-2xl font-bold text-[#29251F]">
                Send an Atelier Inquiry
              </h2>
              <p className="text-xs text-[#958878] mt-1 font-light">
                Fill out the details below and a personal stylist will reach out via WhatsApp or phone.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-white border border-[#C6A46A]/30 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-[#1B4332]" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-[#29251F] mb-2">
                  Request Confirmed
                </h3>
                <p className="text-xs text-[#5A5348] mb-6 font-light">
                  Our private client advisory team has received your request and is preparing a personalized consultation.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      inquiryType: "Bespoke Bridal Styling",
                      boutique: "Mumbai Flagship (Colaba)",
                      message: ""
                    });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#29251F] text-[#F5F0E7] text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Merchant"
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      WhatsApp / Mobile (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. radhika@example.com"
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                    >
                      <option value="Bespoke Bridal Styling">Bespoke Bridal Styling</option>
                      <option value="Boutique Salon Visit">Boutique Salon Visit</option>
                      <option value="Order & Delivery Status">Order & Delivery Status</option>
                      <option value="Anti-Tarnish Care & Warranty">Anti-Tarnish Care & Warranty</option>
                      <option value="Press & Gifting Inquiries">Press & Gifting Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                    Preferred Salon or Virtual Consultation
                  </label>
                  <select
                    value={formData.boutique}
                    onChange={(e) => setFormData({ ...formData, boutique: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                  >
                    <option value="Mumbai Flagship (Colaba)">Mumbai Flagship (Colaba Causeway)</option>
                    <option value="Delhi Heritage House (Mehrauli)">Delhi Heritage House (Mehrauli)</option>
                    <option value="Bengaluru Atelier (Lavelle Road)">Bengaluru Atelier (Lavelle Road)</option>
                    <option value="Virtual Video Styling Session">Virtual Video Styling Session (Google Meet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#958878] uppercase tracking-wider mb-1">
                    How Can We Assist You?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any details about your outfit colors, occasion date, or specific pieces you would like to view..."
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-white border border-[#E9DED1] focus:outline-none focus:border-[#C6A46A] text-[#29251F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#C6A46A] hover:bg-[#B08E55] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Concierge</span>
                </button>

                <p className="text-[11px] text-[#958878] text-center mt-2">
                  🔒 We protect your privacy. No promotional spam ever.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Instant WhatsApp Hotline & Boutiques (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp VIP Direct Chat */}
            <div className="bg-[#1B4332] text-white rounded-3xl p-6 sm:p-8 shadow-luxury relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DFCCA6] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>INSTANT CONCIERGE</span>
                </span>
                <h3 className="font-editorial text-2xl font-bold mb-2">
                  Chat Instantly on WhatsApp
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mb-6 font-light">
                  Speak directly with a senior jewellery specialist. Get real-time high-resolution video previews and size recommendations.
                </p>

                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=Hi%20SHRINGAR%20Styling%20Team!%20I%20would%20like%20assistance%20with%20a%20jewellery%20piece.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-white text-[#1B4332] font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:bg-[#F5F0E7] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#1B4332]" />
                  <span>Open WhatsApp (+{storeConfig.whatsappNumber})</span>
                </a>
              </div>
            </div>

            {/* Physical Flagship Boutiques */}
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-8 shadow-luxury">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#E9DED1]">
                <MapPin className="w-4 h-4 text-[#C6A46A]" />
                <h3 className="font-editorial text-xl font-bold text-[#29251F]">
                  Flagship Boutiques
                </h3>
              </div>

              <div className="space-y-6 divide-y divide-[#E9DED1]">
                {(storeConfig.boutiques || []).map((boutique, i) => (
                  <div key={i} className={i > 0 ? "pt-5" : ""}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-editorial text-base font-bold text-[#29251F]">
                        {boutique.city} — {boutique.salon}
                      </h4>
                      <span className="text-[10px] font-bold text-[#1B4332] bg-[#1B4332]/10 px-2 py-0.5 rounded-full">
                        Open Daily
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5348] font-light leading-relaxed mb-2">
                      {boutique.address}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-[#958878]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C6A46A]" />
                        {boutique.timing || boutique.hours}
                      </span>
                      <a
                        href={`tel:${boutique.phone}`}
                        className="flex items-center gap-1 font-semibold text-[#29251F] hover:text-[#C6A46A]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#C6A46A]" />
                        {boutique.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-[#E9DED1] text-xs text-[#958878]">
                <p>
                  Atelier Concierge Hotline: <strong className="text-[#29251F]">+91 99999 99999</strong>
                </p>
                <p className="mt-1">
                  Email: <strong className="text-[#29251F]">concierge@shringar.com</strong>
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
