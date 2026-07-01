# YouTube Page Topology

## Layout Structure
1. **Masthead (Header)**
   - Fixed top (z-index 2000, height 56px)
   - Background: `#0f0f0f`
   - Elements: Left (menu button, YouTube logo), Center (search bar form, voice search), Right (create video, notifications, user profile avatar)
2. **Sidebar Navigation**
   - Mini Sidebar: Fixed left, width 72px, height calc(100vh - 56px), z-index 1000. Shows Home, Shorts, Subscriptions, You.
   - Expanded Sidebar: Flyout/toggleable overlay or fixed, width 240px, height calc(100vh - 56px), padding.
3. **Chip Cloud (Category Bar)**
   - Sticky/Fixed under masthead (top 56px, left 72px / 240px)
   - Layout: horizontal flex list with overflow scrolling, left/right scroll buttons.
4. **Video Grid**
   - Main content scroll container, flows below header and chips.
   - Grid layout: responsive columns (1 col on mobile, 2 on small screens, 3 on medium, 4 on desktop, up to 5-6 on wide screens).
   - Video Card Components: Thumbnail (hover zooms or scales, showing duration badge), Avatar & metadata row (Avatar, Video Title, Channel Name, Views & Time badge).
