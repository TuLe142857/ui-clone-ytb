"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileItem } from "@/types";
import {
  EllipsisVerticalIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileImageIcon,
  FileDocumentIcon,
  FileCodeIcon,
  FileArchiveIcon,
  DownloadIcon,
  PlayCircleIcon
} from "./icons";

interface FileCardProps {
  item: FileItem;
}

export default function FileCard({ item }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to render the thumbnail/preview area based on file type
  const renderPreview = () => {
    switch (item.type) {
      case "video":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-800">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {item.duration && (
              <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-[#0f0f0f]/90 text-[12px] font-medium text-white rounded">
                {item.duration}
              </span>
            )}
            <span className="absolute top-2.5 left-2.5 p-1 bg-black/60 backdrop-blur-md rounded-full text-red-500">
              <FileVideoIcon size={14} />
            </span>
          </div>
        );

      case "audio":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-violet-950/70 via-zinc-900 to-black flex items-center justify-center border border-zinc-800/50">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Visualizer wave animation (hover trigger) */}
            <div className="absolute bottom-6 flex items-center gap-1.5 h-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-violet-400 rounded-full transition-all duration-300 ${
                    isHovered ? "animate-bounce" : "h-2"
                  }`}
                  style={{
                    height: isHovered ? "20px" : "8px",
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </div>

            {/* Disk/Album cover visual */}
            <div className="relative w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-700/80 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <FileAudioIcon size={24} className="text-violet-400" />
              <div className="absolute w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800" />
            </div>

            {/* Format & Size Badges */}
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-violet-500/20 backdrop-blur-md text-[10px] font-bold text-violet-300 border border-violet-500/30 rounded uppercase">
              {item.fileDetails?.format || "AUDIO"}
            </span>
            <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-black/60 text-[11px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>
            {item.duration && (
              <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-[#0f0f0f]/90 text-[12px] font-medium text-white rounded">
                {item.duration}
              </span>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-3 bg-violet-500 rounded-full shadow-lg text-white scale-90 group-hover:scale-100 transition-transform duration-300 cursor-pointer hover:bg-violet-400">
                <PlayCircleIcon size={26} fill="currentColor" />
              </div>
            </div>
          </div>
        );

      case "image":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/50">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.05]"
              loading="lazy"
            />
            {/* Overlay Grid lines for a premium mock editor look on hover */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Image Stats Overlays */}
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-emerald-500/20 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/30 rounded uppercase">
              {item.fileDetails?.format || "IMAGE"}
            </span>
            {item.fileDetails?.dimensions && (
              <span className="absolute bottom-2.5 left-2.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-[11px] font-medium text-zinc-300 rounded border border-zinc-800/50">
                {item.fileDetails.dimensions}
              </span>
            )}
            <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-black/60 text-[11px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>

            {/* Download Overlay button */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="p-3 bg-emerald-500 rounded-full shadow-lg text-white scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-emerald-400">
                <DownloadIcon size={20} />
              </button>
            </div>
          </div>
        );

      case "document":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-rose-950/40 via-zinc-900 to-zinc-950 flex items-center justify-center border border-zinc-800/50">
            <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Book Spine Visual effect */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-rose-800/60 border-r border-rose-900/30 group-hover:bg-rose-700/60 transition-colors" />

            <div className="flex flex-col items-center gap-2 max-w-[80%] text-center">
              <FileDocumentIcon size={42} className="text-rose-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mt-1">
                {item.fileDetails?.format || "DOCUMENT"}
              </span>
            </div>

            {/* Page Count Badges */}
            <span className="absolute top-2.5 left-5 px-2 py-0.5 bg-rose-500/20 backdrop-blur-md text-[10px] font-bold text-rose-300 border border-rose-500/30 rounded uppercase">
              {item.fileDetails?.pages || "PDF"}
            </span>
            <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 bg-black/60 text-[11px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>

            {/* Read / Download Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-2 bg-rose-600 rounded-full font-semibold shadow-lg text-white text-xs scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-rose-500 flex items-center gap-1.5">
                <FileDocumentIcon size={14} />
                <span>Read Document</span>
              </div>
            </div>
          </div>
        );

      case "code":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/50 flex flex-col font-mono text-[9px] text-[#f1f1f1]/70 leading-normal p-3 group-hover:border-sky-500/50 transition-colors duration-300 select-none">
            {/* Simulated Window Title Bar */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/60">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[9px] text-zinc-500 select-none">
                {item.fileDetails?.language || "Source Code"}
              </span>
            </div>

            {/* IDE-like Code Block */}
            <div className="flex-1 overflow-hidden relative">
              <pre className="text-zinc-400 select-none text-left pl-2">
                <code>
                  {item.fileDetails?.codeSnippet || "// Sample Code Snippet..."}
                </code>
              </pre>
              
              {/* Blur gradient bottom covering text */}
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent" />
            </div>

            {/* Size Badge */}
            <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-sky-500/20 backdrop-blur-md text-[10px] font-bold text-sky-300 border border-sky-500/30 rounded uppercase font-sans">
              {item.size}
            </span>
            <span className="absolute top-2 left-[50px] px-1.5 py-0 bg-black/60 text-[9px] font-medium text-zinc-400 rounded font-sans">
              {item.fileDetails?.linesCount} lines
            </span>

            {/* Hover Action */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="px-4 py-2 bg-sky-600 rounded-full font-semibold shadow-lg text-white text-xs scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-sky-500 flex items-center gap-1.5 font-sans">
                <FileCodeIcon size={14} />
                <span>Open File</span>
              </div>
            </div>
          </div>
        );

      case "archive":
        return (
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 flex flex-col justify-between border border-zinc-800/50 p-4">
            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Top row with Folder Zipped layout */}
            <div className="flex items-start justify-between">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                <FileArchiveIcon size={28} />
              </div>
              <div className="flex flex-col items-end">
                <span className="px-1.5 py-0.5 bg-amber-500/20 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30 rounded uppercase">
                  {item.fileDetails?.format || "ZIP"}
                </span>
                <span className="text-[11px] text-zinc-400 mt-1">{item.fileDetails?.fileCount} files</span>
              </div>
            </div>

            {/* Inner files structure view snippet */}
            <div className="flex-1 mt-2 text-[10px] font-mono text-zinc-500 overflow-hidden text-left flex flex-col gap-0.5">
              {item.fileDetails?.filesList?.map((filename, i) => (
                <div key={i} className="truncate hover:text-zinc-300">
                  📁 {filename}
                </div>
              ))}
            </div>

            <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 bg-black/60 text-[11px] font-medium text-zinc-300 rounded font-sans">
              {item.size}
            </span>

            {/* Extract / Download Action */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-4 py-2 bg-amber-600 rounded-full font-semibold shadow-lg text-white text-xs scale-90 group-hover:scale-100 transition-transform duration-300 hover:bg-amber-500 flex items-center gap-1.5">
                <DownloadIcon size={14} />
                <span>Extract Archive</span>
              </button>
            </div>
          </div>
        );

      default:
        return <div className="aspect-video w-full rounded-xl bg-zinc-800" />;
    }
  };

  return (
    <div
      className="relative flex flex-col gap-3 group w-full select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/files/${item.id}`} className="flex flex-col gap-3 w-full">
        {renderPreview()}

        {/* Details Area */}
        <div className="flex gap-3 px-1">
          {/* User avatar representing uploader */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-800/80">
            <img
              src={item.avatar}
              alt={item.channelName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Text descriptions */}
          <div className="flex flex-col gap-1 overflow-hidden flex-1 text-left">
            <h3 className="text-sm font-medium text-[#f1f1f1] line-clamp-2 leading-5 tracking-tight group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#aaaaaa] hover:text-white transition-colors truncate">
                {item.channelName}
              </span>
              <div className="flex items-center text-[13px] text-[#aaaaaa] flex-wrap leading-4 mt-0.5">
                <span>{item.views || item.downloads}</span>
                {item.time && (
                  <>
                    <span className="mx-1 text-[10px]">•</span>
                    <span>{item.time}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* More Actions Dropdown icon */}
      <div 
        className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 active:bg-zinc-700 cursor-pointer"
          aria-label="Action menu"
        >
          <EllipsisVerticalIcon size={20} />
        </button>
      </div>
    </div>
  );
}
