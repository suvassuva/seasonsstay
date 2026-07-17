"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoItem {
  src: string;
  label: string;
}

interface VideoSliderProps {
  videos: VideoItem[];
  interval?: number;
}

export default function VideoSlider({ videos, interval = 6000 }: VideoSliderProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIdx ? 1 : -1);
      setActiveIdx(index);
    },
    [activeIdx]
  );

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [isPaused, goNext, interval]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="lg:col-span-6 flex flex-col gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Video Card */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-2xl border border-primary/10 bg-black">
        {/* Prev / Next Arrows */}
        <button
          onClick={goPrev}
          aria-label="Previous video"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={goNext}
          aria-label="Next video"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>

        {/* Slide Area */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={videos[activeIdx].src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient + caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 z-10 flex items-end justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] uppercase tracking-widest text-primary font-semibold">
              {String(activeIdx + 1).padStart(2, "0")} / {String(videos.length).padStart(2, "0")}
            </span>
            <h4 className="text-white font-serif text-sm md:text-base font-semibold">
              {videos[activeIdx].label}
            </h4>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-1.5">
        {videos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to video ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === activeIdx
                ? "w-5 h-1.5 bg-primary"
                : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
