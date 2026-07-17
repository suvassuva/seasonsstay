"use client";

import React from "react";
import Link from "next/link";
import { Room } from "@/types";
import { useAuth } from "@/components/provider/state-provider";
import { formatPrice } from "@/lib/utils";
import { Users, Eye, Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const { user, toggleWishlist } = useAuth();
  const isWished = user?.wishlist.includes(room.id) || false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert("Please sign in to add rooms to your wishlist.");
      return;
    }
    toggleWishlist(room.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="group rounded-2xl bg-card border border-primary/10 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Gallery Slider Anchor */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
        {room.images[0].endsWith(".mp4") ? (
          <video
            src={room.images[0]}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <img
            src={room.images[0]}
            alt={room.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        )}
        {/* Luxury premium banner */}
        {room.isPremium && (
          <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[8px] uppercase tracking-widest font-semibold text-background gold-gradient shadow-md">
            Premium
          </span>
        )}
        
        {/* Wishlist Heart Overlay */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer ${
            isWished
              ? "bg-red-500 text-white"
              : "bg-black/35 text-white/90 hover:bg-white hover:text-black"
          }`}
        >
          <Heart size={16} fill={isWished ? "white" : "none"} />
        </button>

        {/* View Indicator Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs font-medium tracking-wide flex items-center gap-1.5">
            <Eye size={14} /> Click to view details
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3.5 flex flex-col flex-grow">
        {/* Tagline & Name */}
        <span className="text-[8px] uppercase tracking-widest text-primary font-semibold mb-0.5">
          {room.view}
        </span>
        <h3 className="text-sm font-serif font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
          {room.name}
        </h3>
        <p className="text-[11px] text-foreground/60 leading-relaxed mb-2.5 flex-grow line-clamp-2">
          {room.description}
        </p>

        {/* Dynamic Badges */}
        <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-primary/10 mb-2.5 text-[9px] text-foreground/70">
          <div className="flex flex-col gap-1 items-center text-center">
            <Users size={12} className="text-primary" />
            <span>Max {room.maxGuests} Guests</span>
          </div>
          <div className="flex flex-col gap-1 items-center text-center border-x border-primary/10">
            <Coffee size={12} className="text-primary" />
            <span>{room.bedType.split(" ")[0]} Bed</span>
          </div>
          <div className="flex flex-col gap-1 items-center text-center">
            <span className="font-semibold text-primary">{room.sizeSqFt}</span>
            <span>Sq. Ft.</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-foreground/40 font-medium">From</span>
            <span className="text-sm font-bold font-sans text-primary">
              {formatPrice(room.pricePerNight)}
              <span className="text-[9px] font-normal text-foreground/60"> / Night</span>
            </span>
          </div>
          
          <Link
            href={`/rooms/${room.id}`}
            className="px-3.5 py-1.5 rounded-full border border-primary/20 hover:border-primary text-[9px] font-semibold uppercase tracking-wider text-foreground hover:bg-primary/5 transition-all duration-300 cursor-pointer"
          >
            Explore Room
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
