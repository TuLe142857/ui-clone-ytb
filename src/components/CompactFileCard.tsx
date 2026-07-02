"use client";

import React from "react";
import Link from "next/link";
import { FileItem } from "@/types";
import {
  EllipsisVerticalIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileImageIcon,
  FileDocumentIcon,
  FileCodeIcon,
  FileArchiveIcon
} from "./icons";

interface CompactFileCardProps {
  item: FileItem;
}

export default function CompactFileCard({ item }: CompactFileCardProps) {
  // Helper to render the miniature preview
  const renderMiniPreview = () => {
    switch (item.type) {
      case "video":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
              loading="lazy"
            />
            {item.duration && (
              <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-[#0f0f0f]/90 text-[10px] font-medium text-white rounded">
                {item.duration}
              </span>
            )}
          </div>
        );

      case "audio":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-violet-950/60 to-zinc-950 flex items-center justify-center border border-zinc-800/40">
            <FileAudioIcon size={20} className="text-violet-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 text-[9px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>
            <span className="absolute top-1 left-1 px-1 bg-violet-500/20 text-[8px] font-bold text-violet-300 rounded">
              {item.fileDetails?.format || "MP3"}
            </span>
          </div>
        );

      case "image":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-800/40">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-200"
              loading="lazy"
            />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 text-[9px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>
            <span className="absolute top-1 left-1 px-1 bg-emerald-500/20 text-[8px] font-bold text-emerald-300 rounded">
              IMG
            </span>
          </div>
        );

      case "document":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-rose-950/40 to-zinc-950 flex items-center justify-center border border-zinc-800/40">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-rose-800" />
            <FileDocumentIcon size={20} className="text-rose-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 text-[9px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>
            <span className="absolute top-1 left-3.5 px-1 bg-rose-500/20 text-[8px] font-bold text-rose-300 rounded">
              DOC
            </span>
          </div>
        );

      case "code":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-950 border border-zinc-800/40 p-2 flex flex-col font-mono text-[6px] text-zinc-500 text-left select-none">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800/40 mb-1 font-sans text-[7px]">
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
              </div>
              <span>{item.fileDetails?.language}</span>
            </div>
            <pre className="overflow-hidden leading-tight">
              <code>{`import React from "react";\nexport default function App() {}`}</code>
            </pre>
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 text-[9px] font-medium text-zinc-300 rounded font-sans">
              {item.size}
            </span>
          </div>
        );

      case "archive":
        return (
          <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-amber-950/40 to-zinc-950 flex items-center justify-center border border-zinc-800/40">
            <FileArchiveIcon size={20} className="text-amber-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-black/60 text-[9px] font-medium text-zinc-300 rounded">
              {item.size}
            </span>
            <span className="absolute top-1 left-1 px-1 bg-amber-500/20 text-[8px] font-bold text-amber-300 rounded">
              ZIP
            </span>
          </div>
        );

      default:
        return <div className="w-40 h-24 rounded-lg bg-zinc-800 flex-shrink-0" />;
    }
  };

  return (
    <div className="relative flex gap-2.5 group w-full select-none">
      <Link href={`/files/${item.id}`} className="flex gap-2.5 w-full">
        {renderMiniPreview()}

        {/* Details right-hand */}
        <div className="flex flex-col flex-1 min-w-0 pr-6 text-left">
          <h4 className="text-xs font-semibold text-[#f1f1f1] line-clamp-2 leading-4.5 group-hover:text-white transition-colors">
            {item.title}
          </h4>
          <span className="text-[11px] text-[#aaaaaa] mt-1 hover:text-white truncate">
            {item.channelName}
          </span>
          <div className="flex items-center text-[11px] text-[#aaaaaa] truncate mt-0.5">
            <span>{item.views || item.downloads}</span>
            {item.time && (
              <>
                <span className="mx-1 text-[8px]">•</span>
                <span>{item.time}</span>
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Action Ellipsis Menu */}
      <div 
        className="absolute top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 active:bg-zinc-700 cursor-pointer"
          aria-label="Action menu"
        >
          <EllipsisVerticalIcon size={16} />
        </button>
      </div>
    </div>
  );
}
