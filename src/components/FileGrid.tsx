"use client";

import React from "react";
import { FileItem } from "@/types";
import FileCard from "./FileCard";

interface FileGridProps {
  files: FileItem[];
}

export default function FileGrid({ files }: FileGridProps) {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-400 gap-2">
        <p className="text-lg font-medium">No files found</p>
        <p className="text-sm text-zinc-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-x-4 gap-y-10 p-6 w-full max-w-[2200px] mx-auto">
      {files.map((file) => (
        <FileCard key={file.id} item={file} />
      ))}
    </div>
  );
}
