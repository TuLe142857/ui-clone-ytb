"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import FileDetailViewer from "@/components/FileDetailViewer";
import CompactFileCard from "@/components/CompactFileCard";
import { useSidebar } from "@/context/SidebarContext";
import mockData from "../../../../docs/research/youtube/mockData.json";
import { FileItem } from "@/types";

export default function FileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isSidebarExpanded, toggleSidebar } = useSidebar();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Home");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: "c1",
      author: "Alex Rivers",
      avatar: "/images/youtube/avatar_0.jpg",
      time: "2 hours ago",
      text: "The details and visual representation on this file review page are absolutely top tier. Love the micro-animations!"
    },
    {
      id: "c2",
      author: "CodeCraft",
      avatar: "/images/youtube/avatar_8.jpg",
      time: "1 day ago",
      text: "Having dedicated visualizers for audio and zip archives is so convenient. Great developer tool UX here."
    },
    {
      id: "c3",
      author: "Elena Petrova",
      avatar: "/images/placeholder-avatar.jpg",
      time: "3 days ago",
      text: "The transparency toggle on the image viewer EXIF stats came in very handy. Outstanding design!"
    }
  ]);

  const fileId = params?.id as string;
  const fileItem = (mockData.files as FileItem[]).find((f) => f.id === fileId);

  // Auto-collapse sidebar on dynamic review page mount to replicate YouTube watch page layout
  useEffect(() => {
    if (isSidebarExpanded) {
      toggleSidebar();
    }
    // Optional clean-up to expand it again when exiting watch page
    return () => {
      if (!isSidebarExpanded) {
        toggleSidebar();
      }
    };
  }, []);

  if (!fileItem) {
    return (
      <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
        <Header />
        <div className="flex flex-1 pt-14 items-center justify-center flex-col gap-4">
          <p className="text-xl font-medium text-zinc-400">File or Document not found</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 font-semibold text-sm rounded-full transition-all cursor-pointer"
          >
            Return to Home Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get recommended/related files (exclude current one)
  const recommendations = (mockData.files as FileItem[]).filter(
    (f) => f.id !== fileId
  );

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: `c_${Date.now()}`,
      author: "MeU User",
      avatar: "/images/placeholder-avatar.jpg",
      time: "Just now",
      text: commentText
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white">
      {/* Fixed top Header */}
      <Header />

      {/* Main Layout content */}
      <div className="flex flex-1 pt-14">
        {/* Sidebar Nav */}
        <Sidebar
          activeItem={activeSidebarItem}
          onItemSelect={(item) => {
            setActiveSidebarItem(item);
            if (item === "Home") {
              router.push("/");
            }
          }}
        />

        {/* Scrollable watch main wrapper */}
        <main
          className={`flex-1 flex flex-col md:flex-row gap-6 p-6 transition-all duration-150 ease-in-out ${
            isSidebarExpanded ? "md:pl-[240px]" : "md:pl-[72px]"
          }`}
        >
          {/* Left Main column (Viewer, Title, Channel details, Comments) */}
          <div className="flex-1 flex flex-col gap-4 max-w-[1400px]">
            {/* Dynamic visualizer window */}
            <FileDetailViewer item={fileItem} />

            {/* Info details */}
            <div className="flex flex-col gap-3 mt-1 text-left">
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                {fileItem.title}
              </h1>

              {/* Action buttons row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-1.5 border-b border-zinc-800/60 pb-4">
                {/* Channel details & Subscribe */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-800/80">
                    <img
                      src={fileItem.avatar}
                      alt={fileItem.channelName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white truncate max-w-[160px]">
                      {fileItem.channelName}
                    </span>
                    <span className="text-[11px] text-zinc-400">12.5K subscribers</span>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-white text-black font-semibold text-xs rounded-full hover:bg-zinc-200 transition-colors cursor-pointer select-none">
                    Subscribe
                  </button>
                </div>

                {/* File actions download / share / like */}
                <div className="flex items-center gap-2 flex-wrap text-xs select-none">
                  {/* Like/Dislike combined button */}
                  <div className="flex items-center bg-zinc-800 hover:bg-zinc-700/80 rounded-full overflow-hidden border border-zinc-800">
                    <button className="flex items-center gap-1.5 pl-4 pr-3 py-2 border-r border-zinc-700 hover:bg-zinc-750 text-white cursor-pointer">
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                      </svg>
                      <span className="font-semibold">Likes</span>
                    </button>
                    <button className="px-3 py-2 hover:bg-zinc-750 text-white cursor-pointer" aria-label="Dislike">
                      <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor" className="transform rotate-180">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Share button */}
                  <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-full cursor-pointer border border-zinc-850">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11.1z" />
                    </svg>
                    <span>Share</span>
                  </button>

                  {/* Download button */}
                  <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-full cursor-pointer border border-zinc-850">
                    <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Metadata Description Box */}
              <div 
                className="bg-zinc-800/40 hover:bg-zinc-800/60 transition-colors p-3 rounded-xl text-sm flex flex-col gap-1 cursor-pointer border border-zinc-850/50"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                <div className="flex items-center gap-3 text-white font-semibold text-xs">
                  <span>{fileItem.views || fileItem.downloads}</span>
                  <span>•</span>
                  <span>Uploaded {fileItem.time}</span>
                  <span>•</span>
                  <span className="text-zinc-400 capitalize">{fileItem.type} file format</span>
                </div>

                <p className={`text-zinc-300 text-xs leading-relaxed mt-2 select-text ${
                  isDescriptionExpanded ? "" : "line-clamp-2"
                }`}>
                  Detailed review specifications for this resource item. This document/file contains structure analysis, code parameters, raw properties representation, and layout details for implementation.
                  {"\n\n"}
                  File Name: {fileItem.title}
                  {"\n"}File Size: {fileItem.size || "Unknown"}
                  {"\n"}Author/Owner: {fileItem.channelName}
                  {"\n\n"}
                  Thank you for reviewing, and please share feedback or leave comments below if you notice styling issues or layout discrepancies.
                </p>

                <button className="text-white text-xs font-semibold mt-1.5 self-start select-none">
                  {isDescriptionExpanded ? "Show less" : "...more"}
                </button>
              </div>
            </div>

            {/* Comments Area */}
            <div className="mt-4 text-left">
              <h3 className="text-base font-bold text-white mb-4">
                {comments.length} Comments
              </h3>

              {/* Add Comment input */}
              <form onSubmit={handlePostComment} className="flex gap-3 mb-6 items-start">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img
                    src="/images/placeholder-avatar.jpg"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="bg-transparent border-b border-zinc-700 focus:border-white focus:outline-none py-1.5 text-sm text-white w-full"
                  />
                  {commentText && (
                    <div className="flex gap-2 justify-end text-xs">
                      <button
                        type="button"
                        onClick={() => setCommentText("")}
                        className="px-3.5 py-1.5 hover:bg-zinc-800 rounded-full font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 text-black font-semibold rounded-full transition-colors cursor-pointer"
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </form>

              {/* Comments list */}
              <div className="flex flex-col gap-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-start text-xs sm:text-sm">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 flex-shrink-0">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-xs">{comment.author}</span>
                        <span className="text-[10px] text-zinc-500">{comment.time}</span>
                      </div>
                      <p className="text-zinc-300 text-xs sm:text-sm mt-1 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Recommended sidebar column (Compact Cards) */}
          <div className="w-full md:w-[360px] lg:w-[400px] flex flex-col gap-5 flex-shrink-0">
            <h3 className="text-sm font-semibold text-zinc-400 text-left border-b border-zinc-900 pb-2">
              Recommended Files
            </h3>
            <div className="flex flex-col gap-4">
              {recommendations.map((file) => (
                <CompactFileCard key={file.id} item={file} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
