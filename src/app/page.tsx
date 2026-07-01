"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChipBar from "@/components/ChipBar";
import VideoGrid from "@/components/VideoGrid";
import { useSidebar } from "@/context/SidebarContext";
import mockData from "../../docs/research/youtube/mockData.json";

export default function Home() {
  const { isSidebarExpanded } = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Home");
  const [activeChip, setActiveChip] = useState("All");

  // Dynamic filter for interactive category switching
  const getFilteredVideos = () => {
    if (activeChip === "All") {
      return mockData.videos;
    }
    
    return mockData.videos.filter((video) => {
      const query = activeChip.toLowerCase();
      
      if (query === "music") {
        return (
          video.title.toLowerCase().includes("music") ||
          video.title.toLowerCase().includes("song") ||
          video.title.toLowerCase().includes("hits") ||
          video.title.toLowerCase().includes("spotify") ||
          video.channelName.toLowerCase().includes("lofi girl")
        );
      }
      
      if (query === "lo-fi") {
        return (
          video.title.toLowerCase().includes("lofi") ||
          video.title.toLowerCase().includes("beats") ||
          video.title.toLowerCase().includes("relax")
        );
      }
      
      if (query === "coding") {
        return (
          video.title.toLowerCase().includes("program") ||
          video.title.toLowerCase().includes("code") ||
          video.title.toLowerCase().includes("learn") ||
          video.title.toLowerCase().includes("tutorial") ||
          video.title.toLowerCase().includes("python") ||
          video.title.toLowerCase().includes("c++") ||
          video.title.toLowerCase().includes("java")
        );
      }
      
      // Default fallback string matching
      return (
        video.title.toLowerCase().includes(query) ||
        video.channelName.toLowerCase().includes(query)
      );
    });
  };

  const filteredVideos = getFilteredVideos();

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Fixed top Header */}
      <Header />

      {/* Main body layout */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar Nav */}
        <Sidebar 
          activeItem={activeSidebarItem} 
          onItemSelect={(item) => {
            setActiveSidebarItem(item);
            // Optional: reset category chip on sidebar navigation changes
            if (item !== "Home") {
              setActiveChip("All");
            }
          }} 
        />

        {/* Scroll Container with responsive padding offsets */}
        <main 
          className={`flex-1 flex flex-col transition-all duration-150 ease-in-out ${
            isSidebarExpanded 
              ? "md:pl-[240px]" 
              : "md:pl-[72px]"
          }`}
        >
          {/* Category Chip Bar */}
          <ChipBar 
            chips={mockData.chips} 
            activeChip={activeChip} 
            onChipSelect={setActiveChip} 
          />

          {/* Videos Grid */}
          <div className="flex-1 overflow-y-auto">
            <VideoGrid videos={filteredVideos} />
          </div>
        </main>
      </div>
    </div>
  );
}
