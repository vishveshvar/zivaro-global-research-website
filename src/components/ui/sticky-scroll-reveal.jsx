"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const containerRef = useRef(null);

  // Hook scroll to track page progression through the sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress across equal segments for each service
    const nextIndex = Math.min(
      cardLength - 1,
      Math.max(0, Math.floor(latest * cardLength))
    );
    setActiveCard(nextIndex);
  });

  // Light, premium palette consistent with Zivaro's brand
  const defaultLightBackgrounds = [
    "#FFFFFF", // 1. Warm white
    "#EAF4FC", // 2. Pale ice blue
    "#F1F5F9", // 3. Subtle cool grey
    "#F8FAFC", // 4. Soft off-white
    "#F7F9FC", // 5. Soft off-white
    "#E6F2FB", // 6. Pale ice blue / light blue
    "#F1F5F9", // 7. Subtle cool grey
    "#EAF4FC", // 8. Pale ice blue
  ];

  const currentBg =
    content[activeCard]?.background ||
    defaultLightBackgrounds[activeCard % defaultLightBackgrounds.length];

  const activeItem = content[activeCard] || content[0];

  // Helper to jump directly to a card when clicking an indicator
  const handleJumpToCard = (index) => {
    setActiveCard(index);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetScroll =
        scrollTop + rect.top + (index / cardLength) * (rect.height - window.innerHeight);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${Math.max(240, cardLength * 40)}vh` }}
    >
      <div className="sticky top-20 sm:top-24 w-full">
        <motion.div
          animate={{ backgroundColor: currentBg }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="relative w-full rounded-3xl p-6 sm:p-8 lg:p-12 border border-slate-200/80 shadow-[0_20px_50px_-20px_rgba(7,27,51,0.08)] overflow-hidden"
        >
          {/* Top Status & Interactive Navigation Bar */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 border-b border-slate-200/70 pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#071B33]">
                SERVICE {String(activeCard + 1).padStart(2, "0")} / {String(cardLength).padStart(2, "0")}
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-[#65BFFF]" />
            </div>

            {/* Interactive Progress Indicators (Pills) */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {content.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleJumpToCard(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    activeCard === idx
                      ? "w-7 sm:w-9 bg-[#071B33]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Jump to service ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Balanced Two-Column Layout (Desktop) / Clean Stacked Layout (Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Text Column: ONLY the currently active service text */}
            <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeCard}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200 text-[#071B33] text-xs font-semibold tracking-wide shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#65BFFF]" />
                    <span>Active Capability</span>
                  </div>

                  <h3 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-head text-[#071B33] tracking-tight leading-[1.14]">
                    {activeItem.title}
                  </h3>

                  <p className="text-sm sm:text-base lg:text-lg font-body text-[#4F5B6B] leading-relaxed max-w-xl">
                    {activeItem.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Panel Column: ONLY the currently active service visual panel */}
            <div className="lg:col-span-6 order-2 lg:order-2">
              <div
                className={cn(
                  "relative w-full h-[190px] sm:h-[260px] lg:h-[380px] xl:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white",
                  contentClassName
                )}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`visual-${activeCard}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {activeItem.content ?? null}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
