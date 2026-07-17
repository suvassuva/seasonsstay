"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getStoredBookings } from "@/lib/firebase";
import { Booking } from "@/types";
import { formatPrice, formatDate, calculateNights } from "@/lib/utils";
import { CheckCircle2, Download, Home, Printer, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  // Load the created booking
  useEffect(() => {
    if (bookingId) {
      const allBookings = getStoredBookings();
      const match = allBookings.find((b) => b.id === bookingId);
      if (match) {
        setBooking(match);
      }
    }
    setLoading(false);
  }, [bookingId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center flex flex-col items-center justify-center gap-4">
        <span className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin block" />
        <p className="text-sm text-foreground/60">Verifying reservation invoice...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center flex flex-col gap-6">
        <span className="text-6xl">⚠️</span>
        <h2 className="text-3xl font-serif font-bold">Booking Not Found</h2>
        <p className="text-sm text-foreground/60 leading-relaxed">
          The requested booking invoice does not exist or you do not have permissions to access it.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient self-center"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const nights = calculateNights(booking.checkIn, booking.checkOut);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-10 print:py-0 print:px-0">
      {/* Success Hero Header */}
      <div className="flex flex-col items-center text-center gap-4 print:hidden">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary animate-zoom-in">
          <CheckCircle2 size={40} className="stroke-[1.5]" />
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Reservation Confirmed</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
          Your Stay is Secured
        </h1>
        <p className="text-sm text-foreground/60 max-w-md">
          A confirmation email has been dispatched to <strong className="text-foreground">{booking.guestDetails.email}</strong>. Please find your invoice receipt details below.
        </p>
      </div>

      {/* Invoice Receipt Panel */}
      <div className="bg-card border border-primary/15 rounded-3xl p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Decorative corner tag */}
        <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden print:hidden">
          <div className="absolute top-4 -right-8 w-28 bg-primary/10 border border-primary/20 text-primary py-1 text-[8px] font-bold uppercase tracking-widest text-center rotate-45">
            PAID
          </div>
        </div>

        {/* Invoice Title & Logo */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary/10 pb-6">
          <div className="flex items-center gap-2">
            <img src="/images/logo.jpeg" alt="4 Seasons Stay Logo" className="w-8 h-8 rounded-full object-cover shadow-md" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-wide text-foreground print:text-black">4 Seasons Stay</span>
              <span className="text-[9px] uppercase tracking-widest text-primary font-semibold">Boutique Stays</span>
            </div>
          </div>
          <div className="flex flex-col md:items-end text-xs text-foreground/60 print:text-black">
            <span>Invoice Ref: <strong>{booking.id}</strong></span>
            <span>Date: {formatDate(booking.createdAt)}</span>
          </div>
        </div>

        {/* Stay & Room Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          <div className="flex flex-col gap-2">
            <h4 className="font-serif font-bold text-sm text-primary">Accommodation Details</h4>
            <div className="flex flex-col gap-1 text-foreground/75 print:text-black">
              <span className="font-semibold text-foreground text-sm print:text-black">{booking.roomName}</span>
              <span className="flex items-center gap-1.5 mt-1">
                <Calendar size={14} className="text-primary shrink-0" />
                {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)} ({nights} {nights === 1 ? "night" : "nights"})
              </span>
              <span className="flex items-center gap-1.5 mt-1">
                <Users size={14} className="text-primary shrink-0" />
                {booking.guests} Guests Registered
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-primary/10 pt-4 md:pt-0 md:pl-8">
            <h4 className="font-serif font-bold text-sm text-primary">Guest Information</h4>
            <div className="flex flex-col gap-1 text-foreground/75 print:text-black">
              <span className="font-semibold text-foreground print:text-black">{booking.guestDetails.fullName}</span>
              <span>Email: {booking.guestDetails.email}</span>
              <span>Phone: {booking.guestDetails.phone}</span>
              {booking.specialRequests && (
                <span className="text-[11px] text-foreground/50 mt-1 block italic print:text-black">
                  Request: &ldquo;{booking.specialRequests}&rdquo;
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="flex flex-col gap-3.5 border-t border-primary/10 pt-6">
          <h4 className="font-serif font-bold text-sm text-primary">Billing Details</h4>
          <div className="flex flex-col gap-3 text-xs">
            {/* Base room price */}
            <div className="flex justify-between items-center text-foreground/80 print:text-black">
              <span>Suite Accommodation Charges</span>
              <span className="font-semibold">{formatPrice(booking.basePrice)}</span>
            </div>

            {/* Discounts */}
            {booking.discountAmount > 0 && (
              <div className="flex justify-between items-center text-primary font-semibold">
                <span>Voucher Code Discount ({booking.couponCode})</span>
                <span>-{formatPrice(booking.discountAmount)}</span>
              </div>
            )}

            {/* Taxes */}
            <div className="flex justify-between items-center text-foreground/80 print:text-black">
              <span>Luxury GST & Service Surcharge (18%)</span>
              <span className="font-semibold">{formatPrice(booking.taxAmount)}</span>
            </div>

            {/* Total Paid */}
            <div className="flex justify-between items-end border-t border-primary/10 pt-4 text-sm font-semibold">
              <span className="font-serif text-foreground print:text-black">Total Paid (Direct Rate)</span>
              <span className="text-xl text-primary font-bold">{formatPrice(booking.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Terms footer in Invoice */}
        <div className="border-t border-primary/5 pt-6 flex flex-col gap-2 text-[10px] text-foreground/40 text-center print:text-black">
          <p>Please present a government-issued photo ID upon check-in. Valet check-in opens at 2:00 PM.</p>
          <p>4 Seasons Stay, 23, Chandni Chowk Rd, Swamy Shivanandapuram, Shivaji Nagar, Bengaluru • reservations@4seasonsstay.com • 099544 55730</p>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center print:hidden">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-primary/30 hover:border-primary text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-primary/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer size={14} /> Print Receipt
        </button>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-primary/30 hover:border-primary text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-primary/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download size={14} /> Download Receipt PDF
        </button>

        <Link
          href="/rooms"
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-primary text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowRight size={14} /> Browse More Rooms
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-xs font-semibold uppercase tracking-wider text-background hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home size={14} /> Return Home
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto py-32 text-center flex flex-col items-center justify-center gap-4">
        <span className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin block" />
        <p className="text-sm text-foreground/60 font-medium">Verifying reservation invoice...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
