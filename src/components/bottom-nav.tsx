"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  BedDouble,
  Sparkles,
  Images,
  Info,
  Phone,
} from "lucide-react";

const tabs = [
  { name: "Home", path: "/", icon: Home },
  { name: "Rooms", path: "/rooms", icon: BedDouble },
  { name: "Amenities", path: "/amenities", icon: Sparkles },
  { name: "Gallery", path: "/gallery", icon: Images },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Determine active tab — exact match for Home, startsWith for others
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bottom-nav-glass safe-area-bottom md:hidden">
      <div className="max-w-md mx-auto px-1 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="relative flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all duration-300 group min-w-[54px]"
            >
              {/* Active pill background */}
              {active && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className="relative z-10">
                <Icon
                  size={18}
                  strokeWidth={active ? 2.2 : 1.5}
                  className={`transition-all duration-300 ${
                    active
                      ? "text-primary drop-shadow-[0_0_4px_rgba(197,168,128,0.4)]"
                      : "text-foreground/45 group-hover:text-foreground/70"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[9px] font-medium tracking-tight transition-all duration-300 ${
                  active
                    ? "text-primary"
                    : "text-foreground/40 group-hover:text-foreground/60"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
