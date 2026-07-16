"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LUXURY_ROOMS, COUPONS } from "@/lib/mock-data";
import { useBooking } from "@/components/provider/state-provider";
import { cn, formatPrice, calculateNights, formatDate } from "@/lib/utils";
import { Check, Calendar, Users, ShieldAlert, Award, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/provider/state-provider";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, toggleWishlist } = useAuth();
  const { searchParams, setSearchParams, setSelectedRoomId } = useBooking();

  // Find the selected room
  const room = LUXURY_ROOMS.find((r) => r.id === id);

  // Gallery Active Image
  const [activeImg, setActiveImg] = useState<string>("");

  // Booking Card Parameters (initialized with search parameters)
  const [checkIn, setCheckIn] = useState(searchParams.checkIn);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut);
  const [guests, setGuests] = useState(searchParams.guests);
  const [couponCode, setCouponCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  useEffect(() => {
    if (room && room.images.length > 0) {
      setActiveImg(room.images[0]);
    }
  }, [room]);

  if (!room) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center flex flex-col gap-6">
        <span className="text-6xl">🔍</span>
        <h2 className="text-3xl font-serif font-bold">Suite Not Found</h2>
        <p className="text-sm text-foreground/60 leading-relaxed">
          The requested luxury room configuration does not exist in our hotel catalog.
        </p>
        <Link
          href="/rooms"
          className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient self-center"
        >
          Return to Rooms Directory
        </Link>
      </div>
    );
  }

  const isWished = user?.wishlist.includes(room.id) || false;
  const nights = calculateNights(checkIn, checkOut);

  // Price calculations
  const pricePerNight = room.pricePerNight;
  const basePrice = pricePerNight * (nights || 1);
  const taxRate = 0.18; // 18% Luxury Tax / GST
  const discountAmount = basePrice * discountPct;
  const taxAmount = (basePrice - discountAmount) * taxRate;
  const totalPrice = basePrice - discountAmount + taxAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (COUPONS[code] !== undefined) {
      setDiscountPct(COUPONS[code]);
      setCouponSuccess(`Coupon applied! ${COUPONS[code] * 100}% discount active.`);
    } else {
      setDiscountPct(0);
      setCouponError("Invalid promo code. Try LUXURY20 or WELCOME10.");
    }
  };

  const handleBookNow = () => {
    if (nights <= 0) {
      alert("Please select a valid check-out date that is after your check-in date.");
      return;
    }
    // Set booking context state
    setSearchParams({
      checkIn,
      checkOut,
      guests
    });
    setSelectedRoomId(room.id);
    
    // Save coupon details if any to session or pass along
    if (typeof window !== "undefined") {
      sessionStorage.setItem("4s_checkout_coupon", discountPct > 0 ? couponCode.trim().toUpperCase() : "");
    }

    // Redirect to checkout flow
    router.push("/booking");
  };

  // Generate simulated calendar grid
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-12">
      {/* Back button */}
      <Link
        href="/rooms"
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
      >
        <ArrowLeft size={14} /> Back to Listings
      </Link>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column (70%) */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Room Header */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
                  {room.view} • {room.sizeSqFt} Sq. Ft.
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mt-2">
                  {room.name}
                </h1>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    alert("Please sign in to add to wishlist.");
                    return;
                  }
                  toggleWishlist(room.id);
                }}
                className={`w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center cursor-pointer transition-all ${
                  isWished ? "bg-red-500 text-white border-red-500" : "bg-card hover:bg-primary/5 text-primary"
                }`}
              >
                <Heart size={20} fill={isWished ? "white" : "none"} />
              </button>
            </div>
            <p className="text-base text-primary/80 italic font-serif mt-1">{room.tagline}</p>
          </div>

          {/* Interactive Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-muted shadow-lg border border-primary/10">
              <img src={activeImg} alt={room.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={cn(
                    "w-24 md:w-32 aspect-[4/3] rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer",
                    activeImg === img ? "border-primary scale-[0.98]" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img} alt={`${room.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description & Long Description */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-serif font-semibold border-b border-primary/10 pb-3 text-foreground">
              Suite Overview
            </h3>
            <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans">
              {room.longDescription}
            </p>
          </div>

          {/* Facilities / Amenities */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-serif font-semibold border-b border-primary/10 pb-3 text-foreground">
              Room Facilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {room.facilities.map((fac, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated Availability Calendar */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-serif font-semibold border-b border-primary/10 pb-3 text-foreground">
              Simulated Availability Calendar
            </h3>
            <div className="p-6 rounded-2xl bg-card border border-primary/10 flex flex-col gap-6">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="font-serif">July 2026</span>
                <span className="text-[10px] uppercase tracking-widest text-primary">Simulated Live</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-foreground/50 mb-2">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Offset padding for July 2026 starts on Wednesday (3 empty slots) */}
                <div className="aspect-square" />
                <div className="aspect-square" />
                <div className="aspect-square" />
                {daysInMonth.map((day) => {
                  const isBooked = day % 7 === 0 || day % 9 === 0; // Simulate booked dates
                  return (
                    <div
                      key={day}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center text-xs font-medium border",
                        isBooked
                          ? "bg-red-500/10 border-red-500/20 text-red-500/70 line-through"
                          : "bg-primary/5 border-primary/10 text-foreground hover:bg-primary/15 cursor-pointer"
                      )}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-start gap-6 text-xs text-foreground/60 mt-2">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-primary/10 border border-primary/20 block" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-red-500/10 border border-red-500/20 block line-through" />
                  <span>Fully Reserved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules and Policies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-semibold text-lg text-foreground border-b border-primary/5 pb-2">
                House Guidelines
              </h4>
              <ul className="list-disc pl-5 text-xs text-foreground/65 flex flex-col gap-2 leading-relaxed">
                <li>Check-in begins at 2:00 PM; Check-out ends at 12:00 PM.</li>
                <li>Strictly non-smoking accommodations inside suite areas.</li>
                <li>Bespoke pet-stay packages can be arranged prior to arrival.</li>
                <li>Quiet hours observed between 11:00 PM and 7:00 AM.</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-semibold text-lg text-foreground border-b border-primary/5 pb-2">
                Cancellation Terms
              </h4>
              <p className="text-xs text-foreground/65 leading-relaxed">
                We offer free booking cancellation up to 48 hours before your scheduled check-in window. Within 48 hours, a fee equivalent to a single night's accommodation rate will be processed.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Sticky Booking Widget (30%) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 z-30">
          <div className="glass p-6 md:p-8 rounded-3xl border border-primary/15 shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-foreground/50">Base Price</span>
                <span className="text-2xl font-bold font-sans text-primary">
                  {formatPrice(room.pricePerNight)}
                  <span className="text-xs font-normal text-foreground/60"> / Night</span>
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-[10px] uppercase font-bold text-primary tracking-widest">
                Direct Best Rate
              </span>
            </div>

            {/* Parameter adjust inputs */}
            <div className="flex flex-col gap-4">
              {/* Check in */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Check-In Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Check out */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Check-Out Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm text-foreground"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm text-foreground cursor-pointer"
                >
                  {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((val) => (
                    <option key={val} value={val} className="text-foreground bg-card">
                      {val} {val === 1 ? "Guest" : "Guests"} (Max {room.maxGuests})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Voucher Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (LUXURY20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-xs uppercase tracking-wider"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg border border-primary text-xs font-semibold text-primary hover:bg-primary hover:text-background transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[11px] text-red-400 -mt-2">{couponError}</p>}
            {couponSuccess && <p className="text-[11px] text-primary -mt-2">{couponSuccess}</p>}

            {/* Price Calculations */}
            <div className="flex flex-col gap-3.5 pt-4 border-t border-primary/10 text-xs">
              <div className="flex justify-between">
                <span className="text-foreground/60">
                  {formatPrice(room.pricePerNight)} x {nights || 1} {nights === 1 ? "night" : "nights"}
                </span>
                <span className="font-semibold">{formatPrice(basePrice)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-foreground/60">18% Luxury GST / Taxes</span>
                <span className="font-semibold">{formatPrice(taxAmount)}</span>
              </div>

              <div className="flex justify-between items-end border-t border-primary/10 pt-4 text-sm text-foreground font-semibold">
                <span className="font-serif">Estimated Total</span>
                <span className="text-lg text-primary font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Book Now trigger */}
            <button
              onClick={handleBookNow}
              className="w-full py-4 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer mt-2"
            >
              Reserve Accommodation
            </button>

            <div className="flex items-start gap-2 text-[10px] text-foreground/50 leading-relaxed">
              <ShieldAlert size={14} className="text-primary shrink-0 mt-0.5" />
              <span>
                Rates shown include full membership access. Direct booking guarantees early check-in triggers (if available) and priority service.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
