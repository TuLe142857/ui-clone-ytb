"use client";

import React from "react";
import { Video } from "@/types";
import { EllipsisVerticalIcon } from "./icons";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="flex flex-col gap-3 group cursor-pointer w-full select-none">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
          loading="lazy"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#0f0f0f]/90 text-[12px] font-medium text-white rounded">
            {video.duration}
          </span>
        )}
      </div>

      {/* Details (Avatar, Title, Channel, Views, Time) */}
      <div className="flex gap-3 px-1">
        {/* Avatar */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-zinc-800 border border-zinc-800">
          <img
            src={video.avatar}
            alt={video.channelName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 overflow-hidden flex-1">
          <h3 className="text-sm font-medium text-[#f1f1f1] line-clamp-2 leading-5 tracking-tight group-hover:text-white transition-colors">
            {video.title}
          </h3>
          <div className="flex flex-col">
            <span className="text-[13px] text-[#aaaaaa] hover:text-white transition-colors truncate">
              {video.channelName}
            </span>
            <div className="flex items-center text-[13px] text-[#aaaaaa] flex-wrap leading-4 mt-0.5">
              <span>{video.views}</span>
              {video.time && (
                <>
                  <span className="mx-1 text-[10px]">•</span>
                  <span>{video.time}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Options Button */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button 
            className="p-1 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 active:bg-zinc-700 cursor-pointer"
            aria-label="Action menu"
          >
            <EllipsisVerticalIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
