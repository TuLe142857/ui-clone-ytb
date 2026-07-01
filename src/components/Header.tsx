"use client";

import React, { useState } from "react";
import { 
  MenuIcon, 
  YouTubeLogo, 
  SearchIcon, 
  VoiceSearchIcon, 
  CreateIcon, 
  NotificationsIcon,
  YouIcon
} from "./icons";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-40 select-none">
      {/* Left side: Menu & Logo */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-zinc-800 active:bg-zinc-700 text-white transition-colors cursor-pointer"
          aria-label="Guide"
        >
          <MenuIcon size={20} />
        </button>
        <a href="/" className="flex items-center">
          <YouTubeLogo size={24} />
        </a>
      </div>

      {/* Center side: Search bar */}
      <form 
        onSubmit={handleSubmit}
        className="flex flex-1 max-w-[640px] items-center gap-4 mx-4"
      >
        <div className="flex flex-1 items-center h-10 bg-[#121212] border border-[#303030] rounded-l-full overflow-hidden focus-within:border-blue-500 focus-within:bg-black pl-4 transition-colors">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-white text-base placeholder-[#888888] font-normal"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-zinc-400 hover:text-white rounded-full mr-1 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <button 
          type="submit"
          className="h-10 px-6 bg-[#222222] border-y border-r border-[#303030] rounded-r-full hover:bg-[#303030] active:bg-[#404040] flex items-center justify-center text-white transition-colors cursor-pointer"
          aria-label="Search"
        >
          <SearchIcon size={20} />
        </button>
        <button
          type="button"
          className="p-2.5 bg-[#222222] hover:bg-zinc-800 active:bg-zinc-700 rounded-full text-white transition-colors hidden sm:block cursor-pointer"
          aria-label="Search with your voice"
        >
          <VoiceSearchIcon size={18} />
        </button>
      </form>

      {/* Right side: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          className="p-2 hover:bg-zinc-800 active:bg-zinc-700 rounded-full text-white transition-colors cursor-pointer"
          aria-label="Create"
        >
          <CreateIcon size={24} />
        </button>
        <div className="relative">
          <button
            className="p-2 hover:bg-zinc-800 active:bg-zinc-700 rounded-full text-white transition-colors cursor-pointer"
            aria-label="Notifications"
          >
            <NotificationsIcon size={24} />
          </button>
          <span className="absolute top-1.5 right-1.5 px-1 bg-[#cc0000] text-[10px] font-bold text-white rounded-full min-w-4 h-4 flex items-center justify-center">
            9+
          </span>
        </div>
        <button
          className="p-1 hover:bg-zinc-800 rounded-full text-white transition-colors ml-1 cursor-pointer"
          aria-label="Profile"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-zinc-700">
            <YouIcon size={22} className="text-zinc-300" />
          </div>
        </button>
      </div>
    </header>
  );
}
