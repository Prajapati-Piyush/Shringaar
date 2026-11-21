import React, { useState } from 'react';
import { User, Package, MapPin, Heart, Shield, LogOut, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function AccountView({
  user,
  onLogout,
  onNavigate,
  onOpenWishlist,
  wishlistCount,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState("orders");

  // Simulated active order
  const orders = [
    {
      id: "SHR-892401",
      date: "20 November 2026",
      status: "Dispatched via BlueDart Air",
      statusStep: 3, // 1: Confirmed, 2: Inspected, 3: Dispatched, 4: Delivered
      trackingNumber: "BLR-AIR-992140",
      total: 2499,
      items: [
        { title: "Mayura Temple Antique Choker", size: "Adjustable", price: 2499, qty: 1 }
      ]
    },
    {
      id: "SHR-771209",
      date: "04 October 2026",
      status: "Delivered",
      statusStep: 4,
      trackingNumber: "MUM-AIR-410294",
      total: 1299,
      items: [
        { title: "Rajwada Kundan Chandbali Jhumkas", size: "One Size", price: 1299, qty: 1 }
      ]
    }
  ];

  return (
    <div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      
      {/* Account Top Profile Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E9DED1] p-6 sm:p-8 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#29251F] text-[#DFCCA6] flex items-center justify-center font-editorial text-2xl font-bold shadow">
            {user?.name ? user.name[0] : "P"}
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C6A46A] block">
              ✦ PRIVÉ PATRON ✦
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#29251F]">
              {user?.name || "Radhika Sharma"}
            </h2>
            <p className="text-xs text-[#958878] mt-0.5">
              +91 {user?.phone || "9876543210"} • {user?.email || "radhika.sharma@example.com"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            onLogout();
            onShowToast("Logged out of Shringaar Privé.");
            onNavigate('home');
          }}
          className="px-4 py-2 rounded-full border border-[#E9DED1] bg-white text-xs font-semibold text-[#29251F] hover:bg-[#F2EBE2] transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (col-span-4) */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-[#E9DED1] p-4 shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === "orders" ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#FAF7F2]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#C6A46A]" />
              <span>My Orders & Dispatch</span>
            </span>
            <span className="text-[10px] bg-[#FAF7F2] text-[#29251F] px-2 py-0.5 rounded-full font-bold">2</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between transition-colors ${
              activeTab === "addresses" ? "bg-[#29251F] text-[#F5F0E7]" : "text-[#29251F] hover:bg-[#FAF7F2]"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#C6A46A]" />
              <span>Address Book</span>
            </span>
          </button>

          <button
            onClick={onOpenWishlist}
            className="w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between text-[#29251F] hover:bg-[#FAF7F2] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Saved Wishlist</span>
            </span>
            <span className="text-[10px] bg-[#FAF7F2] text-[#29251F] px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>
          </button>

          <button
            onClick={() => onNavigate('appointment')}
            className="w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between text-[#29251F] hover:bg-[#FAF7F2] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#C6A46A]" />
              <span>Book Salon Session</span>
            </span>
          </button>
        </div>

        {/* Content Pane (col-span-8) */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-[#E9DED1] p-6 sm:p-8 shadow-sm">
          {activeTab === "orders" && (
            <div>
              <h3 className="font-editorial text-2xl font-normal text-[#29251F] pb-3 border-b border-[#E9DED1] mb-6">
                Active & Previous Orders
              </h3>

              <div className="space-y-6">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9DED1] mb-4">
                      <div>
                        <p className="font-bold text-sm text-[#29251F]">Order Ref: #{ord.id}</p>
                        <p className="text-[11px] text-[#958878]">{ord.date} • BlueDart Air Waybill: {ord.trackingNumber}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase self-start sm:self-auto ${
                        ord.status === "Delivered" ? "bg-emerald-100 text-[#1B4332]" : "bg-[#C6A46A]/20 text-[#29251F]"
                      }`}>
                        {ord.status}
                      </span>
                    </div>

                    {/* Progress tracking step */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] text-[#958878] font-bold uppercase mb-1">
                        <span className="text-[#1B4332]">1. Confirmed</span>
                        <span className="text-[#1B4332]">2. Certified</span>
                        <span className="text-[#1B4332]">3. Dispatched</span>
                        <span className={ord.statusStep >= 4 ? "text-[#1B4332]" : ""}>4. Delivered</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#E9DED1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1B4332] rounded-full"
                          style={{ width: `${(ord.statusStep / 4) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 text-xs">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between font-medium">
                          <span>{it.title} (Size: {it.size}) × {it.qty}</span>
                          <span>₹{it.price.toLocaleString("en-IN")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h3 className="font-editorial text-2xl font-normal text-[#29251F] pb-3 border-b border-[#E9DED1] mb-6">
                Saved Dispatch Addresses
              </h3>

              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E9DED1] space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-sm text-[#29251F] mb-1">
                  <span>Primary Residence</span>
                  <span className="text-[10px] bg-[#C6A46A] text-white px-2 py-0.5 rounded">Default</span>
                </div>
                <p className="font-semibold text-[#29251F]">Radhika Sharma</p>
                <p className="text-[#5A5348]">402, Lotus Palace, 14th Road, Bandra West</p>
                <p className="text-[#5A5348]">Mumbai, Maharashtra - 400050</p>
                <p className="text-[#958878]">Mobile: +91 9876543210</p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
