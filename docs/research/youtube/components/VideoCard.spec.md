# VideoCard Specification

## Overview
- **Target file:** `src/components/VideoCard.tsx`
- **Screenshot:** `docs/design-references/youtube/desktop.png`
- **Interaction model:** Hover-enhanced

## DOM Structure
- **Card Wrapper:** `<div className="flex flex-col gap-3 group cursor-pointer w-full">`
  - **Thumbnail Section:** `<div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#272727]">`
    - **Image:** `<Image src={...} alt={...} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-200">`
    - **Duration Badge:** `<span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-[#0f0f0f]/90 text-[12px] font-medium text-white rounded">`
  - **Details Section:** `<div className="flex gap-3 px-1">`
    - **Channel Avatar:** `<div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0 bg-[#272727]">`
      - `<Image src={...} alt={...} fill className="object-cover">`
    - **Metadata Wrapper:** `<div className="flex flex-col gap-1 overflow-hidden">`
      - **Video Title:** `<h3 className="text-sm font-medium text-white line-clamp-2 leading-5 tracking-tight group-hover:text-neutral-200">`
      - **Channel Name:** `<span className="text-[13px] text-[#aaaaaa] hover:text-white transition-colors">`
      - **Metrics:** `<div className="flex items-center text-[13px] text-[#aaaaaa] flex-wrap leading-4">`
        - Views count: `span`
        - Bullet dot separator: `span`
        - Time elapsed: `span`

## Computed Styles
- **Thumbnail Aspect Ratio:** `16/9` (aspect-video)
- **Title Line Clamp:** maximum `2` lines (`line-clamp-2`)
- **Metadata Font Size:** `13px` / `0.85rem`
- **Thumbnail Border Radius:** `12px` (rounded-xl)

## States & Behaviors
- **Hover Thumbnail Zoom:** Hovering over the card applies a subtle scale zoom (`scale-102` or `scale-103`) to the thumbnail image to make it feel premium.
- **Hover Title underline:** Underlines the title when hovered (optional, standard YouTube behaves this way, or just shifts text color slightly).
- **Tooltips:** Hovering over channel name or avatar shows the channel name.
