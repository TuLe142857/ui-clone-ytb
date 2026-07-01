# VideoGrid Specification

## Overview
- **Target file:** `src/components/VideoGrid.tsx`
- **Screenshot:** `docs/design-references/youtube/desktop.png`
- **Interaction model:** Responsive flow

## DOM Structure
- **Grid Wrapper:** `<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-x-4 gap-y-10 p-6 w-full max-w-[2200px] mx-auto">`
  - Render list of `VideoCard` components.

## Computed Styles
- **Horizontal Gap:** `16px` (gap-x-4)
- **Vertical Gap:** `40px` (gap-y-10)
- **Grid breakpoints:**
  - `cols-1` (default/mobile)
  - `sm:cols-2` (width >= 640px)
  - `md:cols-3` (width >= 768px)
  - `lg:cols-3` (or `lg:cols-4` width >= 1024px)
  - `xl:cols-4` (width >= 1280px)
  - `2xl:cols-5` (width >= 1536px)
  - `3xl:cols-6` (width >= 1920px)

## States & Behaviors
- **Sidebar Padding Adjustment:** The grid left-padding shifts depending on whether the sidebar is expanded (pl-[240px]) or mini (pl-[72px]) to avoid layout overlapping. This is handled by a page layout wrapper class or context state.
- **Skeleton loading:** When fetching, render 8-12 card skeletons matching the card dimensions.
