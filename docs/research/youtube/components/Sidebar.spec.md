# Sidebar Specification

## Overview
- **Target file:** `src/components/Sidebar.tsx`
- **Screenshot:** `docs/design-references/youtube/desktop.png`
- **Interaction model:** Click-driven (links) and hover states

## DOM Structure
- **Mini Sidebar (default/narrow screens):** `<aside className="fixed left-0 top-14 w-[72px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col pt-1 z-30">`
  - Navigation Item: `<button className="flex flex-col items-center justify-center py-4 w-full rounded-xl hover:bg-[#272727] text-white">`
    - Icon
    - Label: `<span className="text-[10px] mt-1.5 font-normal tracking-wide">`
- **Expanded Sidebar (wide screens or toggled open):** `<aside className="fixed left-0 top-14 w-[240px] h-[calc(100vh-56px)] bg-[#0f0f0f] flex flex-col overflow-y-auto px-3 py-3 z-30 scrollbar-thin">`
  - Group: List of navigation items separated by borders.
  - Navigation Item: `<button className="flex items-center gap-6 px-3 py-2.5 w-full rounded-xl hover:bg-[#272727] text-white text-sm font-normal">`
    - Icon
    - Label: `text-sm font-normal`
  - Group Headers / Headings: `px-3 py-2 text-base font-semibold text-white`
  - Footer Links: Text labels at the bottom of the scroll container.

## Computed Styles
- **Mini Sidebar Width:** `72px`
- **Expanded Sidebar Width:** `240px`
- **Hover Background:** `#272727` (`rgba(255,255,255,0.1)`)
- **Active Background:** `#272727` or bolder font style.

## States & Behaviors
- **Sidebar Toggle:** Toggleable open/closed. In open state, it takes `240px` and overlays or pushes content. In closed/default state, it takes `72px`. On mobile screens (<768px), the mini sidebar is hidden and the expanded sidebar acts as a slide-over drawer overlay (z-50) with a dark overlay backdrop.
- **Active Item styling:** The active navigation item has a slightly lighter background (or no border but solid font weight/solid icon).
- **Tooltips:** Hovering sidebar items on the mini sidebar shows a small text tooltip (optional).
