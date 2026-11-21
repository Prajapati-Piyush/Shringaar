import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onShowToast
}) {
  if (!isOpen) return null;

  const [mode, setMode] = useState("signin"); // "signin" | "register" | "otp"
  const [formData, setFormData] = useState({
    name: "Radhika Sharma",
    email: "radhika.sharma@example.com",
    phone: "9876543210",
    otp: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "signin" || mode === "register") {
      if (!formData.phone.trim() || formData.phone.length < 10) {
        onShowToast("Please enter a valid 10-digit mobile number");
        return;
      }
      setMode("otp");
      onShowToast(`✨ OTP sent to +91 ${formData.phone}. Use code: 1234`);
      return;
    }

    if (mode === "otp") {
      onLoginSuccess({
        name: formData.name || "Patron",
        phone: formData.phone,
        email: formData.email
      });
      onShowToast("👑 Welcome to the Shringaar Privé Lounge!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#29251F]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#E9DED1] z-10 animate-fade-in p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white border border-[#E9DED1] flex items-center justify-center text-[#29251F] hover:text-[#C6A46A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9DED1] text-[#C6A46A] text-[10px] font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3 h-3" />
            <span>SHRINGAAR PRIVÉ</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#29251F]">
            {mode === "signin" && "Sign In to Your Vault"}
            {mode === "register" && "Create Your Patron Account"}
            {mode === "otp" && "Enter Security Verification"}
          </h3>
          <p className="text-xs text-[#958878] mt-1 font-light">
            {mode === "otp"
              ? `Verification code dispatched to +91 ${formData.phone}`
              : "Access order histories, private boutique bookings, and reserved pieces."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "register" && (
            <div>
              <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#958878] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                />
              </div>
            </div>
          )}

          {mode !== "otp" && (
            <>
              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                  Mobile Number (10 digits)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#958878] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    placeholder="10-digit mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#958878] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. radhika@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A]"
                  />
                </div>
              </div>
            </>
          )}

          {mode === "otp" && (
            <div>
              <label className="block text-[11px] font-semibold text-[#958878] mb-1">
                4-Digit OTP (Hint: 1234)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#958878] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1234"
                  autoFocus
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 text-sm tracking-widest font-bold rounded-xl border border-[#E9DED1] bg-white text-[#29251F] focus:outline-none focus:border-[#C6A46A] text-center"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 rounded-xl bg-[#29251F] hover:bg-[#3D3830] text-[#F5F0E7] text-xs font-semibold uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {mode === "otp" ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#C6A46A]" />
                <span>Verify & Enter Vault</span>
              </>
            ) : (
              <span>Continue with Instant OTP</span>
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-5 pt-4 border-t border-[#E9DED1] text-center text-xs text-[#958878]">
          {mode === "signin" && (
            <p>
              New to Shringaar?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-[#C6A46A] font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          )}

          {mode === "register" && (
            <p>
              Already a patron?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-[#C6A46A] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}

          {mode === "otp" && (
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-[#958878] hover:text-[#29251F]"
            >
              ← Back to Mobile Entry
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
