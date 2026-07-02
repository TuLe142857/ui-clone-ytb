import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const MenuIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" />
  </svg>
);

export const YouTubeLogo: React.FC<IconProps & { showText?: boolean }> = ({ size = 24, showText = true, ...props }) => (
  <div className="flex items-center gap-1 select-none">
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className="text-[#FF0000]" {...props}>
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
    {showText && (
      <span className="text-white font-semibold font-sans tracking-tighter text-xl leading-none flex items-center">
        YouTube
        <span className="text-[10px] text-zinc-400 self-start ml-0.5 font-normal">VN</span>
      </span>
    )}
  </div>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M20.87 20.17l-5.59-5.59C16.31 13.33 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.33-.69 4.58-1.72l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>
);

export const VoiceSearchIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M12 3c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3s3-1.34 3-3V6c0-1.66-1.34-3-3-3zm7 9h-1c0 2.76-2.24 5-5 5s-5-2.24-5-5H7c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92z" />
  </svg>
);

export const CreateIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z" />
  </svg>
);

export const NotificationsIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2zm11-4v1H3v-1l2-2v-5c0-3.07 1.64-5.64 4.5-6.32V4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v.68C15.36 5.36 17 7.92 17 11v5l2 2z" />
  </svg>
);

export const HomeIcon: React.FC<IconProps & { solid?: boolean }> = ({ size = 24, solid = false, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    {solid ? (
      <path d="M4 10v11h6v-6h4v6h6V10l-8-7z" />
    ) : (
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    )}
  </svg>
);

export const ShortsIcon: React.FC<IconProps & { solid?: boolean }> = ({ size = 24, solid = false, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    {solid ? (
      <path d="M17.77 10.32L12 6.94v6.86l5.77-3.38zM19 12.01c0 1.1-.9 2-2 2h-1v1c0 2.76-2.24 5-5 5s-5-2.24-5-5v-1H5c-1.1 0-2-.9-2-2 0-.32.08-.62.23-.88L6.88 5.4C7.99 3.28 10.74 2.5 12.87 3.62l1 .53c2.76 1.46 3.76 4.88 2.3 7.64l.6.32c1.38.74 2.23 2.18 2.23 3.9z" />
    ) : (
      <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33l-1.27-.72L18 8.7c1.37-2.3 2.18-5.32 0-7.64L16.27 4l-1-.53C12.4 2.12 8.9 3.12 7.5 5.92L3.63 12.8c-1.37 2.3-.57 5.32 1.8 6.64l1.27.72L5 21.3c-1.37 2.3-2.18 5.32 0 7.64l1.73-1L17.5 18.08c2.87-1.46 3.87-4.88 2.4-7.64l-2.13-1.12z" />
    )}
  </svg>
);

export const SubscriptionsIcon: React.FC<IconProps & { solid?: boolean }> = ({ size = 24, solid = false, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    {solid ? (
      <path d="M20 7H4V6h16v1zm2 3H2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10zm-12 9v-6l5 3-5 3zm10-15H4V3h16v1z" />
    ) : (
      <path d="M10 18v-6l5 3-5 3zm10-11H4V6h16v1zm2 3H2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10H22zm-2 11H4v-9h16v9zm0-15H4V3h16v1z" />
    )}
  </svg>
);

export const YouIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

export const HistoryIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
  </svg>
);

export const PlaylistsIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M22 7H2v1h20V7zm0 5H2v1h20v-1zm0 5H2v1h20v-1zm-10-5H2v1h10v-1z" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);

export const ReportIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
  </svg>
);

export const HelpIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
);

export const FeedbackIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const EllipsisVerticalIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" {...props}>
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export const FileVideoIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="23 7 16 12 23 17 23 7" fill="currentColor" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const FileAudioIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="18" cy="16" r="3" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const FileImageIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="currentColor" fillOpacity="0.2" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const FileDocumentIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" fillOpacity="0.2" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const FileCodeIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const FileArchiveIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 11v6" />
    <path d="M9 14h6" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const PlayCircleIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
  </svg>
);

