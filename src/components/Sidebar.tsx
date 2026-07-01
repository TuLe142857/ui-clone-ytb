"use client";

import React from "react";
import { 
  HomeIcon, 
  ShortsIcon, 
  SubscriptionsIcon, 
  YouIcon, 
  HistoryIcon, 
  PlaylistsIcon,
  SettingsIcon,
  ReportIcon,
  HelpIcon,
  FeedbackIcon
} from "./icons";
import { useSidebar } from "@/context/SidebarContext";

interface SidebarProps {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
}

export default function Sidebar({ activeItem = "Home", onItemSelect }: SidebarProps) {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  const handleSelect = (item: string) => {
    if (onItemSelect) onItemSelect(item);
  };

  const footerLinks1 = ["About", "Press", "Copyright", "Contact us", "Creators", "Advertise", "Developers"];
  const footerLinks2 = ["Terms", "Privacy", "Policy & Safety", "How YouTube works", "Test new features"];

  // Mini Sidebar (72px)
  if (!isSidebarExpanded) {
    return (
      <aside className="fixed left-0 top-14 w-[72px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col pt-1 z-30 select-none hidden md:flex">
        <button
          onClick={() => handleSelect("Home")}
          className={`flex flex-col items-center justify-center py-4 px-1 mx-1 rounded-xl transition-colors cursor-pointer ${
            activeItem === "Home" 
              ? "bg-[#272727] text-white" 
              : "text-[#f1f1f1] hover:bg-zinc-800"
          }`}
        >
          <HomeIcon size={20} solid={activeItem === "Home"} />
          <span className="text-[10px] mt-1.5 font-normal tracking-wide truncate max-w-full">Home</span>
        </button>
        <button
          onClick={() => handleSelect("Shorts")}
          className={`flex flex-col items-center justify-center py-4 px-1 mx-1 rounded-xl transition-colors cursor-pointer ${
            activeItem === "Shorts" 
              ? "bg-[#272727] text-white" 
              : "text-[#f1f1f1] hover:bg-zinc-800"
          }`}
        >
          <ShortsIcon size={20} solid={activeItem === "Shorts"} />
          <span className="text-[10px] mt-1.5 font-normal tracking-wide truncate max-w-full">Shorts</span>
        </button>
        <button
          onClick={() => handleSelect("Subscriptions")}
          className={`flex flex-col items-center justify-center py-4 px-1 mx-1 rounded-xl transition-colors cursor-pointer ${
            activeItem === "Subscriptions" 
              ? "bg-[#272727] text-white" 
              : "text-[#f1f1f1] hover:bg-zinc-800"
          }`}
        >
          <SubscriptionsIcon size={20} solid={activeItem === "Subscriptions"} />
          <span className="text-[10px] mt-1.5 font-normal tracking-wide truncate max-w-full">Subs</span>
        </button>
        <button
          onClick={() => handleSelect("You")}
          className={`flex flex-col items-center justify-center py-4 px-1 mx-1 rounded-xl transition-colors cursor-pointer ${
            activeItem === "You" 
              ? "bg-[#272727] text-white" 
              : "text-[#f1f1f1] hover:bg-zinc-800"
          }`}
        >
          <YouIcon size={20} />
          <span className="text-[10px] mt-1.5 font-normal tracking-wide truncate max-w-full">You</span>
        </button>
      </aside>
    );
  }

  // Expanded Sidebar (240px)
  return (
    <>
      {/* Mobile overlay backdrop */}
      <div 
        onClick={toggleSidebar}
        className="fixed inset-0 top-14 bg-black/50 z-20 md:hidden"
      />

      <aside className="fixed left-0 top-14 w-[240px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col overflow-y-auto px-3 py-3 z-30 select-none scrollbar-thin hover:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {/* Main Section */}
        <div className="flex flex-col gap-1 pb-3.5 border-b border-zinc-800">
          <button
            onClick={() => handleSelect("Home")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Home" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <HomeIcon size={20} solid={activeItem === "Home"} />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleSelect("Shorts")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Shorts" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <ShortsIcon size={20} solid={activeItem === "Shorts"} />
            <span>Shorts</span>
          </button>
          <button
            onClick={() => handleSelect("Subscriptions")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Subscriptions" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <SubscriptionsIcon size={20} solid={activeItem === "Subscriptions"} />
            <span>Subscriptions</span>
          </button>
        </div>

        {/* You Section */}
        <div className="flex flex-col gap-1 py-3.5 border-b border-zinc-800">
          <div className="flex items-center gap-2 px-3 py-1 text-base font-medium text-white">
            <span>You</span>
          </div>
          <button
            onClick={() => handleSelect("You")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "You" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <YouIcon size={20} />
            <span>Your channel</span>
          </button>
          <button
            onClick={() => handleSelect("History")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "History" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <HistoryIcon size={20} />
            <span>History</span>
          </button>
          <button
            onClick={() => handleSelect("Playlists")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Playlists" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <PlaylistsIcon size={20} />
            <span>Playlists</span>
          </button>
        </div>

        {/* Explore Section */}
        <div className="flex flex-col gap-1 py-3.5 border-b border-zinc-800">
          <div className="px-3 py-1 text-sm font-medium text-white">
            Explore
          </div>
          <button
            onClick={() => handleSelect("Trending")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d="M17.03 9.78l-5-5-1.25 1.25L14.53 10H3v2h11.53l-3.75 3.75 1.25 1.25 5-5-1.03-1.22zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            <span>Trending</span>
          </button>
          <button
            onClick={() => handleSelect("Music")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h6V3h-6z" />
            </svg>
            <span>Music</span>
          </button>
          <button
            onClick={() => handleSelect("Gaming")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm7-1.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2 3.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
            <span>Gaming</span>
          </button>
          <button
            onClick={() => handleSelect("News")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z" />
            </svg>
            <span>News</span>
          </button>
        </div>

        {/* System Settings */}
        <div className="flex flex-col gap-1 py-3.5 border-b border-zinc-800">
          <button
            onClick={() => handleSelect("Settings")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <SettingsIcon size={20} />
            <span>Settings</span>
          </button>
          <button
            onClick={() => handleSelect("Report")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <ReportIcon size={20} />
            <span>Report history</span>
          </button>
          <button
            onClick={() => handleSelect("Help")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <HelpIcon size={20} />
            <span>Help</span>
          </button>
          <button
            onClick={() => handleSelect("Feedback")}
            className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-zinc-800 text-white text-sm font-normal transition-colors cursor-pointer"
          >
            <FeedbackIcon size={20} />
            <span>Send feedback</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="py-4 px-3 flex flex-col gap-3 text-[12px] font-medium text-zinc-400 select-text leading-4">
          <div className="flex flex-wrap gap-x-2">
            {footerLinks1.map((link) => (
              <a key={link} href="#" className="hover:text-zinc-300">{link}</a>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2">
            {footerLinks2.map((link) => (
              <a key={link} href="#" className="hover:text-zinc-300">{link}</a>
            ))}
          </div>
          <span className="text-[10px] text-zinc-500 font-normal mt-2">© 2026 Google LLC</span>
        </div>
      </aside>
    </>
  );
}
