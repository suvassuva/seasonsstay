"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-card border-t border-primary/10 pt-12 pb-28 text-foreground/80">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full gold-gradient text-background font-serif font-bold text-sm">
              4S
            </span>
            <span className="text-base font-serif font-bold tracking-wider text-foreground">
              4 Seasons Stay
            </span>
          </div>
          <p className="text-xs leading-relaxed text-foreground/60">
            Stay Comfortably. Every Season. Experience a sanctuary where bespoke luxury meets timeless serenity. A single-property haven curated for those who appreciate life&apos;s finest details.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary transition-all duration-300">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-serif uppercase tracking-widest text-foreground font-semibold">
            Explore
          </h4>
          <div className="flex flex-col gap-2 text-xs">
            <Link href="/" className="hover:text-primary transition-colors">Home Page</Link>
            <Link href="/rooms" className="hover:text-primary transition-colors">Our Luxury Rooms</Link>
            <Link href="/amenities" className="hover:text-primary transition-colors">Stay Amenities</Link>
            <Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link>
            <Link href="/about" className="hover:text-primary transition-colors">Our Legacy Story</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Get In Touch</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-serif uppercase tracking-widest text-foreground font-semibold">
            Contact Details
          </h4>
          <div className="flex flex-col gap-3 text-xs text-foreground/60">
            <div className="flex gap-2 items-start">
              <MapPin size={14} className="text-primary shrink-0" />
              <span className="leading-relaxed">23, Chandni Chowk Rd, Swamy Shivanandapuram, Shivaji Nagar, Bengaluru, Karnataka 560051</span>
            </div>
            <div className="flex gap-2 items-center">
              <Phone size={14} className="text-primary shrink-0" />
              <span>099544 55730</span>
            </div>
            <div className="flex gap-2 items-center overflow-hidden">
              <Mail size={14} className="text-primary shrink-0" />
              <span className="break-all">reservations@4seasonsstay.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-serif uppercase tracking-widest text-foreground font-semibold">
            Newsletter
          </h4>
          <p className="text-xs text-foreground/60 leading-relaxed">
            Subscribe to receive exclusive invitations and seasonal boutique luxury offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-primary/20 bg-background/50 focus:outline-none focus:border-primary text-xs transition-colors"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg text-background gold-gradient hover:opacity-95 font-semibold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Subscribe
            </button>
            {submitted && (
              <div className="flex items-center gap-1.5 text-[10px] text-primary mt-1 animate-fade-in">
                <ShieldCheck size={12} />
                <span>Subscription recorded!</span>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 pt-6 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-foreground/40">
        <p>© {new Date().getFullYear()} 4 Seasons Stay. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
