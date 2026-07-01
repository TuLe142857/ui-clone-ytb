"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { Chip } from "@/types";

interface ChipBarProps {
  chips: Chip[];
  activeChip: string;
  onChipSelect: (chipText: string) => void;
}

export default function ChipBar({ chips, activeChip, onChipSelect }: ChipBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [chips]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    const scrollAmount = direction === "left" ? -200 : 200;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="sticky top-14 bg-[#0f0f0f]/95 backdrop-blur-md z-20 flex items-center h-14 px-6 select-none w-full">
      {/* Left scroll button */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center pl-6 pr-12 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent z-10 pointer-events-none">
          <button
            onClick={() => handleScroll("left")}
            className="p-1.5 rounded-full hover:bg-zinc-800 active:bg-zinc-700 bg-transparent text-white transition-colors cursor-pointer pointer-events-auto"
            aria-label="Previous categories"
          >
            <ChevronLeftIcon size={24} />
          </button>
        </div>
      )}

      {/* Main chips container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto scrollbar-none py-2 scroll-smooth w-full"
      >
        {chips.map((chip) => {
          const isSelected = chip.text === activeChip;
          return (
            <button
              key={chip.text}
              onClick={() => onChipSelect(chip.text)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                isSelected
                  ? "bg-white text-black"
                  : "bg-zinc-800/80 hover:bg-zinc-700/90 text-white"
              }`}
            >
              {chip.text}
            </button>
          );
        })}
      </div>

      {/* Right scroll button */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-6 pl-12 bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent z-10 pointer-events-none">
          <button
            onClick={() => handleScroll("right")}
            className="p-1.5 rounded-full hover:bg-zinc-800 active:bg-zinc-700 bg-transparent text-white transition-colors cursor-pointer pointer-events-auto"
            aria-label="Next categories"
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
