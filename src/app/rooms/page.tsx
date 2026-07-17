"use client";

import React, { useState, useMemo } from "react";
import RoomCard from "@/components/room-card";
import { LUXURY_ROOMS } from "@/lib/mock-data";
import { useBooking } from "@/components/provider/state-provider";
import { formatDate } from "@/lib/utils";
import { SlidersHorizontal, CalendarDays, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function RoomsPage() {
  const { searchParams } = useBooking();
  const [capacityFilter, setCapacityFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("default");

  // Reset Filters
  const handleReset = () => {
    setCapacityFilter("all");
    setPriceSort("default");
  };

  // Filter & Sort Logic
  const processedRooms = useMemo(() => {
    let list = [...LUXURY_ROOMS];

    // Capacity filter
    if (capacityFilter !== "all") {
      const cap = parseInt(capacityFilter, 10);
      list = list.filter((r) => r.maxGuests === cap);
    }

    // Sorting
    if (priceSort === "low-high") {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (priceSort === "high-low") {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return list;
  }, [capacityFilter, priceSort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 min-h-[80vh]">
      {/* Page Title Header */}
      <div className="flex flex-col gap-2 max-w-xl">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
          Our Accommodations
        </span>
        <h1 className="text-2xl md:text-3xl font-serif font-bold">
          Refined Rooms & <span className="gold-text-gradient font-semibold">Suites</span>
        </h1>
        <p className="text-xs text-foreground/60 leading-relaxed">
          Select from our handcrafted room configurations. Each option is designed to host your stay with premium linens, tailored acoustics, and picturesque views.
        </p>
      </div>

      {/* active Search Dates Summary Indicator */}
      {searchParams.checkIn && searchParams.checkOut && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-foreground/80">
            <CalendarDays size={14} className="text-primary" />
            <span>
              Showing accommodation availability and rates for:{" "}
              <strong className="text-foreground">{formatDate(searchParams.checkIn)}</strong> to{" "}
              <strong className="text-foreground">{formatDate(searchParams.checkOut)}</strong>
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-[10px] font-semibold text-primary w-fit">
            {searchParams.guests} {searchParams.guests === 1 ? "Guest" : "Guests"} Selected
          </span>
        </div>
      )}

      {/* Filter and Sort Panel */}
      <div className="p-4 rounded-xl flex flex-col lg:flex-row gap-4 justify-between items-center border border-primary/10 bg-card/40 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground shrink-0 self-start lg:self-center">
          <SlidersHorizontal size={14} className="text-primary" />
          <span>Filters & Sort</span>
        </div>

        <div className="flex flex-wrap gap-3.5 items-center w-full lg:w-auto justify-start lg:justify-end">
          {/* Capacity Filter */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-foreground/60 font-medium">Capacity:</span>
            <select
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-primary/20 bg-background focus:outline-none focus:border-primary text-[10px] font-medium cursor-pointer"
            >
              <option value="all">All Capacities</option>
              <option value="2">2 Guests Only</option>
              <option value="3">3 Guests Only</option>
              <option value="4">4 Guests Only</option>
            </select>
          </div>

          {/* Price Sorting */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-foreground/60 font-medium">Sort By:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-primary/20 bg-background focus:outline-none focus:border-primary text-[10px] font-medium cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Reset button */}
          {(capacityFilter !== "all" || priceSort !== "default") && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-semibold text-red-500 hover:bg-red-500/5 rounded-lg border border-red-500/20 transition-all cursor-pointer"
            >
              <RefreshCw size={10} />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Rooms Grid */}
      {processedRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border border-dashed border-primary/20 rounded-3xl bg-card/25">
          <span className="text-4xl">🛏️</span>
          <h3 className="text-xl font-serif font-bold text-foreground">No matching suites found</h3>
          <p className="text-sm text-foreground/60 max-w-sm">
            Try adjusting your guest capacity filters or search parameters to view other accommodations.
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-background gold-gradient cursor-pointer"
          >
            Show All Rooms
          </button>
        </div>
      )}
    </div>
  );
}
