"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/provider/state-provider";
import { User, MessageCircle, Phone, Mail, MessageSquare, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close popover on navigation
  useEffect(() => {
    setPopoverOpen(false);
  }, [pathname]);

  // Click outside to close popover
  useEffect(() => {
    if (!popoverOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-popover-container")) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [popoverOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Amenities", path: "/amenities" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      style={{ zIndex: 9999 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
        scrolled
          ? "glass-nav py-3 shadow-lg shadow-black/5"
          : "bg-background/20 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        {/* Logo Icon Only */}
        <Link href="/" className="group flex items-center" aria-label="4 Seasons Stay Home">
          <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/30 bg-card shadow-md group-hover:scale-105 transition-all duration-300">
            <img
              src="/images/logo.jpeg"
              alt="4 Seasons Stay Logo"
              className="h-full w-full object-cover"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-serif uppercase tracking-widest transition-all duration-300 hover:text-primary ${
                  isActive ? "text-primary font-semibold" : "text-foreground/75 hover:translate-y-[-1px]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Customer Stays / Wishlist Link + Popover */}
        <div className="flex items-center gap-3 relative nav-popover-container">
          {mounted && user && (
            <>
              <button
                onClick={() => setPopoverOpen(!popoverOpen)}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-primary/15 bg-card/30 hover:bg-card/60 hover:border-primary/35 hover:text-primary text-foreground/80 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Toggle contact & stays menu"
                title="Support & Stays"
              >
                <User size={18} />
              </button>

              <AnimatePresence>
                {popoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 w-64 bg-card p-4 rounded-2xl border border-border shadow-2xl z-50 flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-bold">4 Seasons Stay</span>
                      <h4 className="font-serif font-semibold text-xs text-foreground">Guest Support & Account</h4>
                    </div>

                    {/* Small Quick Contact Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      <a
                        href="https://wa.me/18005554732"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 hover:text-primary transition-all group"
                        title="WhatsApp"
                      >
                        <MessageCircle size={16} />
                        <span className="text-[8px] mt-1 text-foreground/50 group-hover:text-primary font-medium">WhatsApp</span>
                      </a>
                      <a
                        href="tel:+18005554732"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 hover:text-primary transition-all group"
                        title="Call Support"
                      >
                        <Phone size={16} />
                        <span className="text-[8px] mt-1 text-foreground/50 group-hover:text-primary font-medium">Call</span>
                      </a>
                      <a
                        href="mailto:reservations@4seasonsstay.com"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 hover:text-primary transition-all group"
                        title="Email Reservations"
                      >
                        <Mail size={16} />
                        <span className="text-[8px] mt-1 text-foreground/50 group-hover:text-primary font-medium">Email</span>
                      </a>
                      <a
                        href="sms:+18005554732"
                        className="flex flex-col items-center justify-center p-2 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 hover:text-primary transition-all group"
                        title="SMS Message"
                      >
                        <MessageSquare size={16} />
                        <span className="text-[8px] mt-1 text-foreground/50 group-hover:text-primary font-medium">SMS</span>
                      </a>
                    </div>

                    <div className="border-t border-primary/10 my-0.5" />

                    {/* Link to dashboard */}
                    <Link
                      href="/dashboard"
                      onClick={() => setPopoverOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all group"
                    >
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        My Stays & Wishlist
                      </span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
