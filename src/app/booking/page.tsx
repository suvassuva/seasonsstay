"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBooking, useAuth } from "@/components/provider/state-provider";
import { LUXURY_ROOMS, COUPONS } from "@/lib/mock-data";
import { cn, formatPrice, calculateNights, generateBookingId, formatDate } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Users, Percent, ShieldCheck, CreditCard, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Booking } from "@/types";

// Validation schema
const bookingFormSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number (min 10 digits)"),
  specialRequests: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookingCheckoutPage() {
  const router = useRouter();
  const { user, createBooking } = useAuth();
  const { searchParams, selectedRoomId, setSelectedRoomId } = useBooking();

  const [couponCode, setCouponCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lookup the room
  const room = LUXURY_ROOMS.find((r) => r.id === selectedRoomId);

  // Initialize Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      specialRequests: ""
    }
  });

  // Autofill if user profile is available
  useEffect(() => {
    if (user) {
      setValue("fullName", user.displayName);
      setValue("email", user.email);
      if (user.phoneNumber) {
        setValue("phone", user.phoneNumber);
      }
    }
  }, [user, setValue]);

  // Load preset coupon from details page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCoupon = sessionStorage.getItem("4s_checkout_coupon");
      if (savedCoupon && COUPONS[savedCoupon.toUpperCase()] !== undefined) {
        const code = savedCoupon.toUpperCase();
        setCouponCode(code);
        setDiscountPct(COUPONS[code]);
        setCouponSuccess(`Coupon ${code} applied from your selection!`);
      }
    }
  }, []);

  if (!room) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center flex flex-col gap-6">
        <span className="text-6xl">🛏️</span>
        <h2 className="text-3xl font-serif font-bold">No Room Selected</h2>
        <p className="text-sm text-foreground/60 leading-relaxed">
          Please select a luxury room and dates from our listings before proceeding to checkout.
        </p>
        <Link
          href="/rooms"
          className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient self-center"
        >
          Browse Suites
        </Link>
      </div>
    );
  }

  const nights = calculateNights(searchParams.checkIn, searchParams.checkOut) || 1;
  const basePrice = room.pricePerNight * nights;
  const taxRate = 0.18; // 18% GST
  const discountAmount = basePrice * discountPct;
  const taxAmount = (basePrice - discountAmount) * taxRate;
  const totalPrice = basePrice - discountAmount + taxAmount;

  // Coupon handling
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (COUPONS[code] !== undefined) {
      setDiscountPct(COUPONS[code]);
      setCouponSuccess(`Coupon Applied! ${COUPONS[code] * 100}% off.`);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("4s_checkout_coupon", code);
      }
    } else {
      setDiscountPct(0);
      setCouponError("Invalid coupon code.");
    }
  };

  // Submit checkout
  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const bookingId = generateBookingId();

    const newBooking: Booking = {
      id: bookingId,
      roomId: room.id,
      roomName: room.name,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      specialRequests: data.specialRequests,
      couponCode: discountPct > 0 ? couponCode.trim().toUpperCase() : undefined,
      basePrice,
      taxAmount,
      discountAmount,
      totalPrice,
      guestDetails: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone
      },
      status: "upcoming",
      createdAt: new Date().toISOString()
    };

    // Save reservation
    createBooking(newBooking);

    // Clear checkout storage
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("4s_checkout_coupon");
    }
    
    // Reset selected room
    setSelectedRoomId(null);
    setIsSubmitting(false);

    // Redirect to confirmation success
    router.push(`/booking/confirmation?id=${bookingId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10">
      <Link
        href={`/rooms/${room.id}`}
        className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors self-start"
      >
        <ChevronLeft size={14} /> Back to Suite Details
      </Link>

      <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
        Secure Your <span className="gold-text-gradient font-semibold">Reservation</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column - Guest Details Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 bg-card border border-primary/10 p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-serif font-semibold border-b border-primary/10 pb-3">
              Guest Profile & Preferences
            </h3>

            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-foreground/80">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Alexander Sterling"
                {...register("fullName")}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors",
                  errors.fullName ? "border-red-400" : "border-primary/20"
                )}
              />
              {errors.fullName && (
                <span className="text-xs text-red-400 font-medium">{errors.fullName.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-wide text-foreground/80">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="guest@luxury.com"
                  {...register("email")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors",
                    errors.email ? "border-red-400" : "border-primary/20"
                  )}
                />
                {errors.email && (
                  <span className="text-xs text-red-400 font-medium">{errors.email.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold tracking-wide text-foreground/80">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...register("phone")}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors",
                    errors.phone ? "border-red-400" : "border-primary/20"
                  )}
                />
                {errors.phone && (
                  <span className="text-xs text-red-400 font-medium">{errors.phone.message}</span>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold tracking-wide text-foreground/80">
                Special Requests / Dietary Requirements (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="E.g., feather-free pillows, allergy details, honeymoon welcome arrangement, airport pickup flight details..."
                {...register("specialRequests")}
                className="w-full px-4 py-3 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-sm transition-colors resize-none"
              />
            </div>

            {/* Credit Card Simulation Notification */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
              <CreditCard size={18} className="text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-foreground">Secure Checkout Guarantee</span>
                <p className="text-[11px] text-foreground/60 leading-relaxed">
                  As this is a mockup checkout dashboard, no actual payment is charged. Confirming reservation will generate your booking invoice and register it instantly.
                </p>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full text-background gold-gradient font-semibold text-xs uppercase tracking-widest hover:opacity-95 shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-background border-t-transparent animate-spin inline-block" />
                  Securing Reservation...
                </>
              ) : (
                "Confirm Luxury Reservation"
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Booking Summary Invoice */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass p-6 md:p-8 rounded-3xl border border-primary/15 shadow-xl flex flex-col gap-6">
            <h3 className="text-lg font-serif font-bold text-foreground border-b border-primary/10 pb-3">
              Booking Invoice Summary
            </h3>

            {/* Room Info */}
            <div className="flex gap-4 items-center">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-20 h-20 rounded-xl object-cover border border-primary/10"
              />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">{room.view}</span>
                <h4 className="font-serif font-bold text-base text-foreground mt-0.5">{room.name}</h4>
                <span className="text-xs text-foreground/60">{room.bedType}</span>
              </div>
            </div>

            {/* Stay parameters */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-primary/10 text-xs">
              <div className="flex gap-2.5 items-center">
                <Calendar size={16} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/50 uppercase">Check-In</span>
                  <span className="font-medium">{formatDate(searchParams.checkIn)}</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-center border-l border-primary/10 pl-4">
                <Calendar size={16} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-foreground/50 uppercase">Check-Out</span>
                  <span className="font-medium">{formatDate(searchParams.checkOut)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-foreground/70">
              <Users size={16} className="text-primary shrink-0" />
              <span>
                Reserved for <strong className="text-foreground">{searchParams.guests} guests</strong> for{" "}
                <strong className="text-foreground">{nights} {nights === 1 ? "night" : "nights"}</strong>
              </span>
            </div>

            {/* Voucher apply on checkout page */}
            <div className="pt-4 border-t border-primary/10 flex flex-col gap-3">
              <span className="text-xs font-semibold text-foreground/80">Add Voucher Code</span>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="LUXURY20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-xs uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg border border-primary text-xs font-semibold text-primary hover:bg-primary hover:text-background transition-colors cursor-pointer shrink-0"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-[10px] text-red-400">{couponError}</p>}
              {couponSuccess && (
                <div className="flex items-center gap-1 text-[10px] text-primary">
                  <Percent size={12} />
                  <span>{couponSuccess}</span>
                </div>
              )}
            </div>

            {/* Final Price Breakdown */}
            <div className="flex flex-col gap-3 pt-4 border-t border-primary/10 text-xs">
              <div className="flex justify-between">
                <span className="text-foreground/60">
                  {formatPrice(room.pricePerNight)} x {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <span className="font-semibold">{formatPrice(basePrice)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-primary font-semibold">
                  <span>Voucher Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-foreground/60">Luxury Taxes (18% GST)</span>
                <span className="font-semibold">{formatPrice(taxAmount)}</span>
              </div>

              <div className="flex justify-between items-end border-t border-primary/10 pt-4 text-sm text-foreground font-semibold">
                <span className="font-serif">Grand Total</span>
                <span className="text-xl text-primary font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 text-[10px] text-primary uppercase font-bold tracking-widest">
              <ShieldCheck size={14} />
              Best Rate Direct Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
