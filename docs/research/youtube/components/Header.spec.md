# Header (Masthead) Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/youtube/desktop.png`
- **Interaction model:** Click-driven & inputs

## DOM Structure
- **Header Wrapper:** `<header className="fixed top-0 left-0 right-0 h-14 bg-[#0f0f0f] flex items-center justify-between px-4 z-40">`
  - **Left Section:** `<div className="flex items-center gap-4">`
    - **Menu Button:** Circular hover button (`MenuIcon`)
    - **Logo:** `YouTubeLogo` component
  - **Center Section (Search):** `<div className="flex flex-1 max-w-[640px] items-center gap-4 mx-4">`
    - **Search Form:** `<form className="flex flex-1 items-center h-10 bg-[#121212] border border-[#303030] rounded-l-full overflow-hidden focus-within:border-blue-500 focus-within:bg-black pl-4">`
      - **Search Input:** `<input type="text" className="w-full bg-transparent outline-none text-white text-base placeholder-[#888888]">`
      - **Clear Button:** optional cross icon when text is entered
    - **Search Button:** `<button className="h-10 px-6 bg-[#222222] border-l border-[#303030] rounded-r-full hover:bg-[#303030] flex items-center justify-center text-white">` (`SearchIcon`)
    - **Voice Search Button:** Circular hover button (`VoiceSearchIcon`) with background `#222222`
  - **Right Section (Actions):** `<div className="flex items-center gap-2">`
    - **Create Video Button:** Circular hover button (`CreateIcon`)
    - **Notifications Button:** Circular hover button (`NotificationsIcon`) with badge count
    - **User Avatar / Sign In:** Circular avatar image or rounded "Sign In" button

## Computed Styles
- **Background Color:** `#0f0f0f`
- **Height:** `56px` (h-14)
- **Border radius of search:** `9999px` (rounded-full)
- **Active state of search input:** border changes to `#065fd4` (or `blue-500` / `blue-600`), and a search icon appears inside the input container prefix.

## States & Behaviors
- **Hamburger Menu Toggle:** Clicking the hamburger menu triggers a global state to toggle between the mini sidebar (72px) and the expanded sidebar (240px).
- **Search Focus:** When the search input is focused, the border turns blue, and the background shifts to pure black.
- **Button Hovers:** All circular buttons on the header show a grey circular background on hover (`rgba(255,255,255,0.1)`).
- **Sign In Button:** Standard YouTube blue-outlined "Sign In" button or user avatar.
