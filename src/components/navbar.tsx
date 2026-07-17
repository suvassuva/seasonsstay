"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/provider/state-provider";
import { Menu, X, User, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Amenities", path: "/amenities" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Top Bar — Minimal: Logo + Hamburger */}
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

          {/* Right Side: Profile (if logged in) + Hamburger */}
          <div className="flex items-center gap-3">
            {user && (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-card/40 hover:bg-card/80 transition-all duration-300 text-xs font-medium text-foreground hover:border-primary/50"
              >
                <User size={14} className="text-primary" />
                <span className="hidden sm:inline max-w-[120px] truncate">My Stays & Wishlist</span>
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-primary/15 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} className="text-foreground/70" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col"
          >
            {/* Backdrop (Fully opaque to hide background elements) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Content */}
            <div className="relative z-10 flex flex-col h-full pt-20 pb-20 px-6 justify-between">
              {/* Nav Links */}
              <div className="flex-grow flex flex-col justify-center gap-1.5 my-auto">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between py-2.5 px-4 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-card/50"
                        }`}
                      >
                        <span
                          className={`text-lg font-serif tracking-wide ${
                            isActive
                              ? "text-primary font-semibold"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {link.name}
                        </span>
                        <ArrowRight
                          size={16}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-primary opacity-100"
                              : "text-foreground/20 opacity-0 group-hover:opacity-100 group-hover:text-foreground/50"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col gap-2 mt-auto"
              >
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary/20 bg-card/40 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-card/70 transition-all"
                >
                  <Award size={14} className="text-primary" />
                  My Stays & Wishlist
                </Link>

                <Link
                  href="/rooms"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-background gold-gradient text-xs font-semibold uppercase tracking-wider shadow-lg shadow-primary/15 hover:opacity-95 transition-all"
                >
                  Book A Stay
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
