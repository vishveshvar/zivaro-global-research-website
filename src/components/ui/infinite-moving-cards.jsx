import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate cards to enable infinite seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "25s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "38s");
      } else {
        // Slow speed: ~52s for calm, readable traversal of the sequence
        containerRef.current.style.setProperty("--animation-duration", "52s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_8%,white_92%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 sm:gap-8 py-4",
          start && "infinite-marquee-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={item.name + idx}
            className="relative w-[340px] sm:w-[420px] md:w-[460px] shrink-0 rounded-2xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-[0_12px_32px_-12px_rgba(7,27,51,0.06)] hover:shadow-[0_18px_40px_-14px_rgba(7,27,51,0.12)] transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Restrained quotation-mark graphic & accent indicator */}
              <div className="flex items-center justify-between mb-4">
                <svg
                  className="w-7 h-7 text-[#65BFFF]/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div className="w-2 h-2 rounded-full bg-[#65BFFF]" />
              </div>

              {/* Readable quote typography */}
              <p className="font-body text-[15px] sm:text-base leading-relaxed text-[#071B33]">
                "{item.quote.replace(/^["']|["']$/g, "")}"
              </p>
            </div>

            {/* Thin divider and author details */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EAF4FC] border border-[#DCECF8] flex items-center justify-center text-[#071B33] font-bold font-head text-sm tracking-wide shrink-0 shadow-sm">
                {item.initials || item.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-head font-bold text-sm sm:text-base text-[#071B33] truncate">
                  {item.name}
                </span>
                <span className="font-body text-xs sm:text-sm text-[#4F5B6B] truncate">
                  {item.title}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
