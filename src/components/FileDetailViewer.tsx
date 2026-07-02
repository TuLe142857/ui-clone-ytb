"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileItem } from "@/types";
import {
  FileVideoIcon,
  FileAudioIcon,
  FileImageIcon,
  FileDocumentIcon,
  FileCodeIcon,
  FileArchiveIcon,
  DownloadIcon,
  PlayCircleIcon
} from "./icons";

interface FileDetailViewerProps {
  item: FileItem;
}

export default function FileDetailViewer({ item }: FileDetailViewerProps) {
  // Common states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);

  // Audio specific
  const audioDurationSec = 1445; // 24:05 mock

  // Image specific
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showCheckerboard, setShowCheckerboard] = useState(true);

  // Document specific
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  // Code specific
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  // Archive specific
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    root: true,
    public: true,
    docs: true
  });
  const [selectedArchiveFile, setSelectedArchiveFile] = useState<string | null>(null);
  const [extractProgress, setExtractProgress] = useState(-1); // -1 means not started

  const handleCopyCode = () => {
    if (item.fileDetails?.codeSnippet) {
      navigator.clipboard.writeText(item.fileDetails.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const startExtraction = () => {
    setExtractProgress(0);
  };

  useEffect(() => {
    if (extractProgress >= 0 && extractProgress < 100) {
      const interval = setInterval(() => {
        setExtractProgress((prev) => Math.min(prev + 20, 100));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [extractProgress]);

  // Audio playback simulator timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && item.type === "audio") {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= audioDurationSec ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, item.type]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const toggleFolder = (folderKey: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderKey]: !prev[folderKey]
    }));
  };

  // Render file-specific viewer
  const renderViewerContent = () => {
    switch (item.type) {
      case "video":
        return (
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            {/* Standard HTML5 Video Player using public sample video */}
            <video
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster={item.thumbnail}
              className="w-full h-full object-contain"
              controls
              autoPlay={false}
            />
          </div>
        );

      case "audio":
        return (
          <div className="w-full aspect-video bg-gradient-to-br from-[#120c1f] via-[#0b0813] to-zinc-950 flex flex-col justify-between p-6 select-none relative overflow-hidden">
            {/* Background Soundwave grid animation */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex-1 flex items-center justify-center gap-8 md:gap-12">
              {/* Album Disk Art */}
              <div className="relative">
                <div 
                  className={`w-32 h-32 md:w-44 md:h-44 rounded-full bg-zinc-900 border-4 border-zinc-800 shadow-2xl flex items-center justify-center transition-transform duration-1000 ${
                    isPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "12s" }}
                >
                  {/* Internal disc pattern */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-zinc-700/60" />
                  <div className="absolute inset-6 rounded-full border border-dashed border-zinc-700/40" />
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-violet-600 border-2 border-zinc-900 shadow-inner flex items-center justify-center">
                    <FileAudioIcon size={20} className="text-white" />
                  </div>
                  {/* Center pinhole */}
                  <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800" />
                </div>

                {/* Vinyl Needle */}
                <div 
                  className={`absolute -top-4 right-2 w-14 h-20 origin-top-left transition-transform duration-500 transform ${
                    isPlaying ? "rotate-[15deg]" : "rotate-0"
                  }`}
                >
                  <svg viewBox="0 0 100 150" className="w-full h-full text-zinc-400 fill-current">
                    <path d="M10 10h10v60H10z" fill="#4b5563" />
                    <path d="M15 70l20 50h10v10H35v-10l-20-50z" fill="#9ca3af" />
                    <circle cx="15" cy="10" r="10" fill="#1f2937" />
                  </svg>
                </div>
              </div>

              {/* Title & Status */}
              <div className="flex flex-col text-left max-w-sm">
                <span className="px-2 py-0.5 self-start bg-violet-500/25 text-violet-300 text-[10px] font-bold tracking-wider rounded uppercase mb-2 border border-violet-500/30">
                  {item.fileDetails?.format || "MP3"} Audio File
                </span>
                <h3 className="text-lg md:text-xl font-medium text-white line-clamp-2 leading-7">
                  {item.title}
                </h3>
                <span className="text-sm text-zinc-400 mt-1">{item.channelName}</span>
                
                {/* Active Waveform visualizer */}
                <div className="flex items-center gap-1 mt-4 h-8">
                  {[...Array(24)].map((_, i) => {
                    const randomHeight = isPlaying 
                      ? Math.floor(Math.random() * 24) + 6
                      : 6;
                    return (
                      <div
                        key={i}
                        className="w-1 bg-violet-500/80 rounded-full transition-all duration-300"
                        style={{ height: `${randomHeight}px` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="w-full bg-black/40 backdrop-blur-md rounded-xl p-4 border border-zinc-800/40 flex flex-col gap-2.5 z-10">
              {/* Timeline slider */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-zinc-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={audioDurationSec}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
                <span className="text-[11px] font-mono text-zinc-400 w-10">
                  {formatTime(audioDurationSec)}
                </span>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play Button */}
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 bg-violet-600 text-white rounded-full hover:bg-violet-500 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                        <polygon points="8,5 19,12 8,19" />
                      </svg>
                    )}
                  </button>

                  <div className="text-left hidden sm:block">
                    <div className="text-xs font-medium text-zinc-300 truncate max-w-[180px]">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {item.size} • {item.fileDetails?.bitrate || "320 kbps"}
                    </div>
                  </div>
                </div>

                {/* Volume slider */}
                <div className="flex items-center gap-2">
                  <button className="text-zinc-400 hover:text-white cursor-pointer">
                    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-16 md:w-24 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="relative w-full aspect-video bg-zinc-950 flex flex-col select-none">
            {/* Top Toolbar */}
            <div className="bg-black/50 border-b border-zinc-800/80 p-2 flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowCheckerboard(!showCheckerboard)}
                  className={`px-2.5 py-1 rounded text-xs border transition-colors cursor-pointer ${
                    showCheckerboard 
                      ? "bg-zinc-800 border-zinc-700 text-white" 
                      : "bg-transparent border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Transparency Grid
                </button>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-400">
                  Resolution: {item.fileDetails?.dimensions || "Unknown"}
                </span>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setZoomLevel((prev) => Math.max(prev - 25, 25))}
                  className="p-1 text-zinc-400 hover:text-white bg-zinc-800/50 rounded hover:bg-zinc-800 cursor-pointer"
                >
                  －
                </button>
                <span className="w-12 text-center text-[11px] font-mono text-zinc-300">
                  {zoomLevel}%
                </span>
                <button 
                  onClick={() => setZoomLevel((prev) => Math.min(prev + 25, 300))}
                  className="p-1 text-zinc-400 hover:text-white bg-zinc-800/50 rounded hover:bg-zinc-800 cursor-pointer"
                >
                  ＋
                </button>
                <button 
                  onClick={() => setZoomLevel(100)}
                  className="px-2 py-0.5 text-zinc-400 hover:text-white bg-zinc-850 hover:bg-zinc-800 rounded border border-zinc-800 text-[10px] ml-1 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Canvas Viewer */}
            <div className="flex-1 relative overflow-auto flex items-center justify-center p-4 min-h-0">
              {/* Checkerboard Backdrop */}
              {showCheckerboard && (
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#242424_25%,transparent_25%),linear-gradient(-45deg,#242424_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#242424_75%),linear-gradient(-45deg,transparent_75%,#242424_75%)] bg-[size:20px_20px] bg-[position:0_0,0_0,10px_10px,10px_10px] bg-zinc-950 opacity-40" />
              )}

              {/* Main Image */}
              <div 
                className="relative transition-all duration-200 shadow-2xl border border-zinc-800 max-h-full"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="max-w-full max-h-[48vh] object-contain"
                />
              </div>
            </div>
          </div>
        );

      case "document":
        return (
          <div className="relative w-full aspect-video bg-zinc-900 flex flex-col select-none">
            {/* Document Controls Top bar */}
            <div className="bg-black/60 border-b border-zinc-800/80 p-2 flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-rose-400 flex items-center gap-1">
                  <FileDocumentIcon size={16} />
                  <span>PDF Viewer</span>
                </span>
                <span className="text-zinc-600">|</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white rounded cursor-pointer"
                  >
                    ◀ Prev
                  </button>
                  <span className="px-2 font-mono text-zinc-300 text-xs">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800 text-white rounded cursor-pointer"
                  >
                    Next ▶
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-zinc-500 font-mono">
                {item.fileDetails?.pages || "PDF"} • {item.size}
              </div>
            </div>

            {/* Simulated PDF Page Sheet */}
            <div className="flex-1 bg-zinc-950 p-6 flex justify-center overflow-y-auto">
              <div className="w-full max-w-xl bg-white text-zinc-900 rounded-lg shadow-2xl p-8 text-left flex flex-col justify-between aspect-[1/1.41] min-h-[400px]">
                {/* PDF Header */}
                <div>
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-3 mb-6">
                    <span className="text-[9px] uppercase tracking-wider text-rose-600 font-bold">
                      {item.title.substring(0, 30)}...
                    </span>
                    <span className="text-[9px] text-zinc-400 font-mono">PAGE {currentPage}</span>
                  </div>

                  {/* PDF Content Mock depending on page */}
                  {currentPage === 1 ? (
                    <div className="flex flex-col gap-4">
                      <h1 className="text-xl font-bold text-zinc-800 leading-tight">
                        {item.title}
                      </h1>
                      <p className="text-xs text-zinc-500 font-medium">
                        Published by {item.channelName} • Documentation & Technical Whitepaper
                      </p>
                      
                      <div className="h-[2px] bg-zinc-200 my-2" />
                      
                      <h3 className="text-sm font-semibold text-zinc-700">TABLE OF CONTENTS</h3>
                      <ol className="text-xs text-zinc-600 space-y-2 list-decimal list-inside pl-1">
                        <li>Executive Technical Abstract</li>
                        <li>Structural Core System Specifications</li>
                        <li>Sub-System Integration Modules</li>
                        <li>Performance Analytics and Core Optimization Benchmarks</li>
                        <li>Security Audits and Access-Control Protocols</li>
                        <li>Appendix & Supplementary Resources</li>
                      </ol>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-wide">
                        Section {currentPage - 1}: Technical Integration
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        To construct a pixel-perfect user interface matching our core aesthetic tokens, developers must initialize variables in `index.css` and enforce HSL palette specifications. Standardized spacing layouts require grid grids running column scales of flex layouts.
                      </p>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Components should import lightweight Lucide vector assets or render localized responsive path SVGs. Interactive elements require explicit transition hover classes and border indicators to wow users on click states.
                      </p>
                      <div className="p-3 bg-zinc-50 border border-zinc-100 rounded text-[10px] font-mono text-zinc-600 mt-2">
                        {`// Configuration Schema
export const CONFIG = {
  theme: "dark",
  tokens: ["oklch", "radius", "shadow"],
  version: "16.2.0-Turbopack"
};`}
                      </div>
                    </div>
                  )}
                </div>

                {/* PDF Footer */}
                <div className="border-t border-zinc-100 pt-3 mt-6 flex justify-between items-center text-[8px] text-zinc-400 font-mono">
                  <span>CONFIDENTIAL - FOR REVIEW ONLY</span>
                  <span>© 2026 {item.channelName}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="relative w-full aspect-video bg-[#0d0f14] flex flex-col font-mono text-xs select-text text-left">
            {/* Editor Top Bar */}
            <div className="bg-[#090b0e] border-b border-zinc-800/80 p-2 flex items-center justify-between text-xs font-sans select-none">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sky-400 flex items-center gap-1">
                  <FileCodeIcon size={16} />
                  <span>{item.fileDetails?.format || "CODE"} Editor</span>
                </span>
                <span className="text-zinc-800">|</span>
                
                {/* Search bar inside code */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Find in code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-[11px] text-white focus:outline-none focus:border-sky-500 w-32 md:w-44"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute right-1.5 top-0.5 text-zinc-500 hover:text-white"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Copy Code & Metrics */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-zinc-500 font-mono">
                  {item.fileDetails?.linesCount || 94} lines • {item.size}
                </span>
                <button
                  onClick={handleCopyCode}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                    copied 
                      ? "bg-emerald-600 text-white" 
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/60"
                  }`}
                >
                  {copied ? "Copied! ✓" : "Copy Code"}
                </button>
              </div>
            </div>

            {/* Code lines container */}
            <div className="flex-1 overflow-auto p-4 flex gap-4 text-[11px] md:text-xs leading-5">
              {/* Line Numbers */}
              <div className="text-zinc-600 select-none text-right pr-2 border-r border-zinc-800/60">
                {[...Array(12)].map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code Snippet with syntax highlighted words simulated */}
              <div className="flex-1 font-mono text-[#abb2bf] whitespace-pre overflow-x-auto">
                <span className="text-[#c678dd]">import</span> React, &#123; createContext, useContext, useState &#125; <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&quot;react&quot;</span>;
                {"\n"}
                <span className="text-[#c678dd]">import</span> &#123; FileItem &#125; <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">&quot;@/types&quot;</span>;
                {"\n\n"}
                <span className="text-[#c678dd]">interface</span> <span className="text-[#e5c07b]">SidebarContextProps</span> &#123;
                {"\n"}  isSidebarExpanded: <span className="text-[#56b6c2]">boolean</span>;
                {"\n"}  toggleSidebar: () =&gt; <span className="text-[#56b6c2]">void</span>;
                {"\n"}&#125;
                {"\n\n"}
                <span className="text-[#c678dd]">export const</span> <span className="text-[#e06c75]">SidebarContext</span> = createContext&lt;<span className="text-[#e5c07b]">SidebarContextProps</span>&gt;(&#123;
                {"\n"}  isSidebarExpanded: <span className="text-[#d19a66]">true</span>,
                {"\n"}  toggleSidebar: () =&gt; &#123;&#125;
                {"\n"}&#125;);
                {"\n\n"}
                <span className="text-[#c678dd]">export function</span> <span className="text-[#61afef]">SidebarProvider</span>(&#123; children &#125;) &#123;
                {"\n"}  <span className="text-[#c678dd]">const</span> [expanded, setExpanded] = useState(<span className="text-[#d19a66]">true</span>);
                {"\n"}  <span className="text-[#c678dd]">return</span> (
                {"\n"}    &lt;<span className="text-[#e06c75]">SidebarContext.Provider</span> value=&#123;&#123; isSidebarExpanded: expanded &#125;&#125;&gt;
                {"\n"}      &#123;children&#125;
                {"\n"}    &lt;/<span className="text-[#e06c75]">SidebarContext.Provider</span>&gt;
                {"\n"}  );
                {"\n"}&#125;
              </div>
            </div>
          </div>
        );

      case "archive":
        return (
          <div className="relative w-full aspect-video bg-zinc-950 flex flex-col text-sm text-zinc-300 select-none text-left">
            {/* Archive Explorer bar */}
            <div className="bg-black/60 border-b border-zinc-800/80 p-2 flex items-center justify-between z-10 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-amber-400 flex items-center gap-1">
                  <FileArchiveIcon size={16} />
                  <span>Archive Explorer ({item.fileDetails?.format || "ZIP"})</span>
                </span>
                <span className="text-zinc-700">|</span>
                <span className="text-zinc-500">{item.fileDetails?.fileCount || 142} files total</span>
              </div>

              {/* Extraction Trigger */}
              <div className="flex items-center gap-2">
                {extractProgress === -1 ? (
                  <button
                    onClick={startExtraction}
                    className="bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-medium px-3 py-1 rounded text-[11px] transition-all cursor-pointer"
                  >
                    Extract All Files
                  </button>
                ) : extractProgress < 100 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-zinc-800 rounded overflow-hidden">
                      <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${extractProgress}%` }} />
                    </div>
                    <span className="text-[10px] text-zinc-400 font-mono">{extractProgress}%</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    Extracted Successfully ✓
                  </span>
                )}
              </div>
            </div>

            {/* Folder / File Explorer Grid Split */}
            <div className="flex-1 flex overflow-hidden min-h-0">
              {/* Folder structure Tree panel (left) */}
              <div className="w-1/3 border-r border-zinc-900 bg-zinc-900/30 p-3 overflow-y-auto flex flex-col gap-1 text-xs">
                {/* Root foldercode */}
                <div className="flex items-center gap-1.5 py-1 px-1.5 hover:bg-zinc-800/60 rounded cursor-pointer" onClick={() => toggleFolder("root")}>
                  <span>{expandedFolders.root ? "▼" : "▶"}</span>
                  <span className="text-amber-400">📁</span>
                  <span className="font-semibold text-zinc-200">root/</span>
                </div>

                {expandedFolders.root && (
                  <div className="pl-4 flex flex-col gap-1 border-l border-zinc-800/50 ml-2">
                    {/* Public Folder */}
                    <div className="flex items-center gap-1.5 py-1 px-1.5 hover:bg-zinc-800/60 rounded cursor-pointer" onClick={() => toggleFolder("public")}>
                      <span>{expandedFolders.public ? "▼" : "▶"}</span>
                      <span className="text-amber-400">📁</span>
                      <span>public/</span>
                    </div>
                    {expandedFolders.public && (
                      <div className="pl-4 flex flex-col gap-1 border-l border-zinc-800/50 ml-2 text-zinc-400">
                        <div className="py-1 px-1.5 hover:bg-zinc-800/40 rounded cursor-pointer flex items-center gap-1.5" onClick={() => setSelectedArchiveFile("public/logo.svg")}>
                          <span>📄</span> <span className={selectedArchiveFile === "public/logo.svg" ? "text-amber-400" : ""}>logo.svg</span>
                        </div>
                        <div className="py-1 px-1.5 hover:bg-zinc-800/40 rounded cursor-pointer flex items-center gap-1.5" onClick={() => setSelectedArchiveFile("public/thumbnail.webp")}>
                          <span>🖼️</span> <span className={selectedArchiveFile === "public/thumbnail.webp" ? "text-amber-400" : ""}>thumbnail.webp</span>
                        </div>
                      </div>
                    )}

                    {/* Docs Folder */}
                    <div className="flex items-center gap-1.5 py-1 px-1.5 hover:bg-zinc-800/60 rounded cursor-pointer" onClick={() => toggleFolder("docs")}>
                      <span>{expandedFolders.docs ? "▼" : "▶"}</span>
                      <span className="text-amber-400">📁</span>
                      <span>docs/</span>
                    </div>
                    {expandedFolders.docs && (
                      <div className="pl-4 flex flex-col gap-1 border-l border-zinc-800/50 ml-2 text-zinc-400">
                        <div className="py-1 px-1.5 hover:bg-zinc-800/40 rounded cursor-pointer flex items-center gap-1.5" onClick={() => setSelectedArchiveFile("docs/DESIGN_TOKENS.md")}>
                          <span>📄</span> <span className={selectedArchiveFile === "docs/DESIGN_TOKENS.md" ? "text-amber-400" : ""}>DESIGN_TOKENS.md</span>
                        </div>
                      </div>
                    )}

                    <div className="py-1 px-1.5 text-zinc-400 hover:bg-zinc-800/45 rounded cursor-pointer flex items-center gap-1.5" onClick={() => setSelectedArchiveFile("package.json")}>
                      <span>📄</span> <span className={selectedArchiveFile === "package.json" ? "text-amber-400" : ""}>package.json</span>
                    </div>
                  </div>
                )}
              </div>

              {/* File details panel (right) */}
              <div className="flex-1 p-4 bg-zinc-950/40 overflow-y-auto flex flex-col justify-between">
                {selectedArchiveFile ? (
                  <div className="flex flex-col gap-3 text-left">
                    <div className="flex items-center gap-2 border-b border-zinc-900 pb-2 mb-2">
                      <span className="text-lg">📄</span>
                      <h4 className="text-sm font-semibold text-white font-mono">{selectedArchiveFile}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-mono">
                      <span className="text-zinc-500">File Type:</span>
                      <span className="text-zinc-300">
                        {selectedArchiveFile.endsWith(".svg") ? "SVG Vector Image" :
                         selectedArchiveFile.endsWith(".webp") ? "WebP Image" :
                         selectedArchiveFile.endsWith(".md") ? "Markdown Document" : "JSON Configuration"}
                      </span>

                      <span className="text-zinc-500">Uncompressed Size:</span>
                      <span className="text-zinc-300">
                        {selectedArchiveFile.endsWith(".svg") ? "1.4 KB" :
                         selectedArchiveFile.endsWith(".webp") ? "84 KB" :
                         selectedArchiveFile.endsWith(".md") ? "4.2 KB" : "1.1 KB"}
                      </span>

                      <span className="text-zinc-500">Compression Method:</span>
                      <span className="text-zinc-300">Deflated (Level 9)</span>
                    </div>

                    <div className="h-[1px] bg-zinc-900 my-2" />

                    <div className="p-3 bg-zinc-900/40 rounded border border-zinc-850 text-[11px] text-zinc-400 leading-relaxed italic">
                      This is a preview representation. Click the download button below to fetch the specific containing file.
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 text-xs gap-1.5">
                    <span>📁 Select a file from the archive tree on the left to inspect its details.</span>
                  </div>
                )}

                {/* Individual File Download option */}
                {selectedArchiveFile && (
                  <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                    <DownloadIcon size={14} />
                    <span>Download Selected File</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <div className="aspect-video w-full rounded-xl bg-zinc-800" />;
    }
  };

  return (
    <div className="w-full bg-[#090b0e] rounded-2xl overflow-hidden shadow-2xl border border-zinc-900">
      {renderViewerContent()}
    </div>
  );
}
