"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/provider/state-provider";
import { User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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

        {/* Right Side: Customer Stays / Wishlist Link */}
        <div className="flex items-center gap-3">
          {user && (
            <Link
              href="/dashboard"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-primary/15 bg-card/30 hover:bg-card/60 hover:border-primary/35 hover:text-primary text-foreground/80 transition-all duration-300 shadow-sm"
              aria-label="My Stays & Wishlist"
              title="My Stays & Wishlist"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
