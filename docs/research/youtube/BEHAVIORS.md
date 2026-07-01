# YouTube Interaction & Behaviors

## Interaction Model: Hover & Click Driven
- **Header Buttons:**
  - Search bar input focuses with a border.
  - Hover states on buttons: subtle grey circular backgrounds (`rgba(255,255,255,0.1)`).
- **Sidebar Items:**
  - Hover changes background to `rgba(255,255,255,0.1)`.
  - Active item has a background of `rgba(255,255,255,0.15)` and bolder font weight.
- **Chips / Pills:**
  - Hover changes background color.
  - Clicking a chip selects it, reversing foreground and background colors (white background with black text).
- **Video Cards:**
  - Hovering a video card displays a play/expand behavior, or plays the video inline after a short delay (for our mockup, we will implement standard CSS hover enhancements like slight thumbnail scaling, displaying a 'play' overlay, or showing an options menu button).
  - Hovering over titles adds underlines.
- **Responsive Layout:**
  - Desktop (1440px): 4-column video grid, mini or full sidebar.
  - Tablet (768px): 2-column or 3-column video grid, mini sidebar.
  - Mobile (390px): 1-column layout, sidebar hidden (bottom tab bar or slide-out menu), search bar becomes icon-only until clicked.
