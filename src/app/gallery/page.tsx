"use client";

import React, { useState } from "react";
import { GALLERY_ITEMS } from "@/lib/mock-data";
import { X, ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const tabs = [
    { id: "all", name: "All Media" },
    { id: "rooms", name: "Suites & Rooms" },
    { id: "exterior", name: "Exterior & Pool" },
    { id: "lobby", name: "Grand Lobby" },
    { id: "restaurant", name: "Dining & Bistro" },
    { id: "parking", name: "Valet & Parking" }
  ];

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => 
    activeTab === "all" ? true : item.category === activeTab
  );

  const openLightbox = (id: string) => {
    // Find index in the CURRENT filtered list to make slide navigation match the active tab view!
    const idx = filteredItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setLightboxIdx(idx);
    }
  };

  const closeLightbox = () => setLightboxIdx(null);

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12 min-h-[85vh]">
      {/* Title Header */}
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-primary">
          Visual Catalog
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Immersive <span className="gold-text-gradient font-semibold">Photo Gallery</span>
        </h1>
        <p className="text-sm text-foreground/60 leading-relaxed">
          Embark on a visual journey through the palatial spaces of 4 Seasons Stay. Filter our categories to explore our suites, lobbies, and wellness spaces.
        </p>
      </div>

      {/* Tab Filter Links */}
      <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              closeLightbox();
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? "text-background gold-gradient shadow-md"
                : "text-foreground/75 hover:text-primary hover:bg-primary/5"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Grid Image Gallery */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(item.id)}
              className="rounded-2xl overflow-hidden aspect-[4/3] bg-card border border-primary/5 relative group cursor-pointer shadow-md"
            >
              {item.type === "video" ? (
                <video
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              )}
              
              {/* Permanent Video Indicator Badge */}
              {item.type === "video" && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[8px] uppercase tracking-widest font-semibold text-background gold-gradient shadow-md flex items-center gap-1">
                  <Play size={8} className="fill-current" /> Video
                </span>
              )}

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-white">
                    {item.type === "video" ? <Play size={16} className="ml-0.5 fill-current" /> : <Maximize2 size={16} />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-white font-serif text-base font-semibold">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Lightbox Overlay Modal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between py-6 px-4"
          >
            {/* Close buttons & text */}
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-white print:hidden">
              <span className="text-xs uppercase tracking-widest font-semibold text-primary">
                {filteredItems[lightboxIdx].category} • Image {lightboxIdx + 1} of {filteredItems.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Image View */}
            <div className="max-w-4xl mx-auto w-full flex items-center justify-between gap-4">
              {/* Prev */}
              <button
                onClick={prevPhoto}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white shrink-0 cursor-pointer transition-colors print:hidden"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Image Frame */}
              <motion.div
                key={lightboxIdx}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredItems[lightboxIdx].type === "video" ? (
                  <video
                    key={lightboxIdx}
                    src={filteredItems[lightboxIdx].url}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="max-h-[70vh] max-w-full rounded-2xl border border-white/5 shadow-2xl"
                  />
                ) : (
                  <img
                    src={filteredItems[lightboxIdx].url}
                    alt={filteredItems[lightboxIdx].title}
                    className="max-h-[70vh] max-w-full object-contain rounded-2xl border border-white/5 shadow-2xl"
                  />
                )}
              </motion.div>

              {/* Next */}
              <button
                onClick={nextPhoto}
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 text-white shrink-0 cursor-pointer transition-colors print:hidden"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Captions */}
            <div className="max-w-4xl mx-auto w-full text-center text-white pb-4">
              <h3 className="font-serif text-lg md:text-xl font-bold">{filteredItems[lightboxIdx].title}</h3>
              <p className="text-xs text-white/50 uppercase tracking-widest mt-1">4 Seasons Stay Boutique Stays</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
