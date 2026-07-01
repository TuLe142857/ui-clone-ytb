# ChipBar Specification

## Overview
- **Target file:** `src/components/ChipBar.tsx`
- **Screenshot:** `docs/design-references/youtube/desktop.png`
- **Interaction model:** Horizontal scroll, click-to-select

## DOM Structure
- **Wrapper:** `<div className="sticky top-14 bg-[#0f0f0f]/95 backdrop-blur-md z-20 flex items-center h-14 px-6 overflow-hidden">`
  - **Scroll Container:** `<div className="flex gap-3 overflow-x-auto scrollbar-none py-2 scroll-smooth w-full">`
    - **Chip:** `<button className="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors duration-150">`
  - **Left/Right Scroll Buttons:** Absolute positioned circular hover buttons (`ChevronLeftIcon`, `ChevronRightIcon`) with gradient overlays to hide background chips.

## Computed Styles
- **Active Chip:** Background `#ffffff` (white), Text `#0f0f0f` (dark black).
- **Inactive Chip:** Background `#272727` (`rgba(255,255,255,0.1)`), Text `#ffffff` (white), Hover Background `#3f3f3f`.
- **Spacing:** `gap-3` (12px spacing between chips)
- **Radius:** `8px` (rounded-lg)

## States & Behaviors
- **Click to Select:** Clicking an inactive chip makes it the active chip (updates state).
- **Horizontal Scroll Navigation:** Left/Right chevron buttons only appear when there is scrollable content to the left or right. Clicking them scrolls the container by 200px.
- **Gradient Overlays:** Smooth black gradients (`from-black/90 to-transparent`) overlay the edges of the bar when the scroll buttons are active.
