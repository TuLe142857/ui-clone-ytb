"use client";

import React from "react";
import { 
  DashboardIcon, 
  WorkspaceIcon, 
  HistoryIcon as RecentIcon,
  SharedIcon,
  TrashIcon,
  FolderIcon,
  PlusIcon,
  SettingsIcon
} from "./icons";
import { useSidebar } from "@/context/SidebarContext";

interface SidebarProps {
  activeItem?: string;
  onItemSelect?: (item: string) => void;
}

export default function Sidebar({ activeItem = "Dashboard", onItemSelect }: SidebarProps) {
  const { isSidebarExpanded, toggleSidebar } = useSidebar();

  const handleSelect = (item: string) => {
    if (onItemSelect) onItemSelect(item);
  };

  const departments = [
    { id: "Dept-IT", name: "Phòng IT", shortName: "IT" },
    { id: "Dept-HR", name: "Phòng Nhân sự", shortName: "Nhân sự" },
    { id: "Dept-Accounting", name: "Phòng Kế toán", shortName: "Kế toán" }
  ];

  // Mini Sidebar (72px)
  if (!isSidebarExpanded) {
    return (
      <aside className="fixed left-0 top-14 w-[72px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col pt-3 pb-4 z-30 select-none hidden md:flex items-center justify-between border-r border-zinc-900">
        <div className="w-full flex flex-col items-center gap-2 overflow-y-auto scrollbar-none">
          {/* Mini Create Button */}
          <button
            onClick={() => handleSelect("Create")}
            className="flex items-center justify-center w-11 h-11 mb-2 bg-white hover:bg-zinc-200 text-black rounded-full transition-all shadow-md cursor-pointer"
            title="Tạo mới"
          >
            <PlusIcon size={20} />
          </button>

          {/* Mini Items */}
          <button
            onClick={() => handleSelect("Dashboard")}
            className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Dashboard" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Trang chủ"
          >
            <DashboardIcon size={20} />
            <span className="text-[9px] mt-1 font-normal truncate max-w-full">Trang chủ</span>
          </button>

          <button
            onClick={() => handleSelect("Workspace")}
            className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Workspace" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Không gian của tôi"
          >
            <WorkspaceIcon size={20} />
            <span className="text-[9px] mt-1 font-normal truncate max-w-full">Cá nhân</span>
          </button>

          <button
            onClick={() => handleSelect("Recent")}
            className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Recent" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Gần đây"
          >
            <RecentIcon size={20} />
            <span className="text-[9px] mt-1 font-normal truncate max-w-full">Gần đây</span>
          </button>

          <button
            onClick={() => handleSelect("Shared")}
            className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Shared" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Được chia sẻ"
          >
            <SharedIcon size={20} />
            <span className="text-[9px] mt-1 font-normal truncate max-w-full">Chia sẻ</span>
          </button>

          <button
            onClick={() => handleSelect("Trash")}
            className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Trash" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Thùng rác"
          >
            <TrashIcon size={20} />
            <span className="text-[9px] mt-1 font-normal truncate max-w-full">Thùng rác</span>
          </button>

          {/* Flat Mini Departments */}
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleSelect(dept.name)}
              className={`flex flex-col items-center justify-center py-3 w-14 rounded-xl transition-colors cursor-pointer ${
                activeItem === dept.name 
                  ? "bg-[#272727] text-white" 
                  : "text-[#f1f1f1] hover:bg-zinc-800"
              }`}
              title={dept.name}
            >
              <FolderIcon size={20} />
              <span className="text-[9px] mt-1 font-normal truncate max-w-full">{dept.shortName}</span>
            </button>
          ))}
        </div>

        {/* Mini Bottom System */}
        <div className="w-full flex flex-col items-center gap-2 mt-auto pt-2 border-t border-zinc-900">
          <button
            onClick={() => handleSelect("Settings")}
            className={`flex flex-col items-center justify-center py-2.5 w-14 rounded-xl transition-colors cursor-pointer ${
              activeItem === "Settings" 
                ? "bg-[#272727] text-white" 
                : "text-[#f1f1f1] hover:bg-zinc-800"
            }`}
            title="Cài đặt"
          >
            <SettingsIcon size={20} />
          </button>
        </div>
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

      <aside className="fixed left-0 top-14 w-[240px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col overflow-y-auto px-3 py-4 z-30 select-none scrollbar-thin hover:scrollbar-thumb-zinc-700 scrollbar-track-transparent border-r border-zinc-900">
        {/* Create Button */}
        <button
          onClick={() => handleSelect("Create")}
          className="flex items-center justify-center gap-3 px-4 py-3 mx-2 mb-4 bg-white hover:bg-zinc-200 text-black rounded-2xl font-semibold text-sm transition-all shadow-md cursor-pointer select-none"
        >
          <PlusIcon size={20} />
          <span>Tạo mới</span>
        </button>

        {/* Nhóm 1: Điều hướng chính (Main) */}
        <div className="flex flex-col gap-1 pb-3.5 border-b border-zinc-800">
          <button
            onClick={() => handleSelect("Dashboard")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Dashboard" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <DashboardIcon size={20} />
            <span>Trang chủ</span>
          </button>
          <button
            onClick={() => handleSelect("Workspace")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Workspace" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <WorkspaceIcon size={20} />
            <span>Không gian của tôi</span>
          </button>
        </div>

        {/* Nhóm 2: Thư viện (Library) */}
        <div className="flex flex-col gap-1 py-3.5 border-b border-zinc-800">
          <div className="px-3 py-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Thư viện
          </div>
          <button
            onClick={() => handleSelect("Recent")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Recent" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <RecentIcon size={20} />
            <span>Tài liệu gần đây</span>
          </button>
          <button
            onClick={() => handleSelect("Shared")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Shared" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <SharedIcon size={20} />
            <span>Được chia sẻ</span>
          </button>
          <button
            onClick={() => handleSelect("Trash")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Trash" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <TrashIcon size={20} />
            <span>Thùng rác</span>
          </button>
        </div>

        {/* Nhóm 3: Phòng ban (Departments) - Flat list */}
        <div className="flex flex-col gap-1 py-3.5 border-b border-zinc-800">
          <div className="px-3 py-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Phòng ban
          </div>
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleSelect(dept.name)}
              className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
                activeItem === dept.name 
                  ? "bg-[#272727] font-medium text-white" 
                  : "text-white hover:bg-zinc-800 font-normal"
              }`}
            >
              <FolderIcon size={20} />
              <span>{dept.name}</span>
            </button>
          ))}
        </div>

        {/* Nhóm 4: Hệ thống (System) */}
        <div className="flex flex-col gap-1 py-3.5">
          <button
            onClick={() => handleSelect("Settings")}
            className={`flex items-center gap-6 px-3 py-2.5 w-full rounded-xl transition-colors text-sm cursor-pointer ${
              activeItem === "Settings" 
                ? "bg-[#272727] font-medium text-white" 
                : "text-white hover:bg-zinc-800 font-normal"
            }`}
          >
            <SettingsIcon size={20} />
            <span>Cài đặt hệ thống</span>
          </button>
        </div>
      </aside>
    </>
  );
}
