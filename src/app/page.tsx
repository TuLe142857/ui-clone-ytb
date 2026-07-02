"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ChipBar from "@/components/ChipBar";
import FileGrid from "@/components/FileGrid";
import { useSidebar } from "@/context/SidebarContext";
import mockData from "../../docs/research/youtube/mockData.json";
import { FileItem } from "@/types";

export default function Home() {
  const { isSidebarExpanded } = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Home");
  const [activeChip, setActiveChip] = useState("All");

  // Dynamic filter for interactive file type switching
  const getFilteredFiles = (): FileItem[] => {
    const allFiles = mockData.files as FileItem[];
    if (activeChip === "All") {
      return allFiles;
    }
    
    const chipToTypeMap: Record<string, string> = {
      "Videos": "video",
      "Audio": "audio",
      "Images": "image",
      "Documents": "document",
      "Code": "code",
      "Archives": "archive"
    };

    const targetType = chipToTypeMap[activeChip];
    if (targetType) {
      return allFiles.filter((file) => file.type === targetType);
    }
    
    return allFiles;
  };

  const filteredFiles = getFilteredFiles();

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Fixed top Header */}
      {/* Passing activeChip back and forth if search matches is possible */}
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

          {/* Files Grid */}
          <div className="flex-1 overflow-y-auto">
            <FileGrid files={filteredFiles} />
          </div>
        </main>
      </div>
    </div>
  );
}

