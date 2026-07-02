export type FileType = "video" | "audio" | "image" | "document" | "code" | "archive";

export interface FileItem {
  id: string;
  type: FileType;
  title: string;
  channelName: string;
  views: string;
  time: string;
  duration: string;
  thumbnail: string;
  avatar: string;
  size?: string;
  downloads?: string;
  fileDetails?: {
    dimensions?: string;
    pages?: string;
    language?: string;
    linesCount?: number;
    fileCount?: number;
    filesList?: string[];
    format?: string;
    codeSnippet?: string;
    bitrate?: string;
  };
}

export type Video = FileItem;

export interface Chip {
  text: string;
  isActive: boolean;
}

