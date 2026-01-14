export interface BlockTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  html: string;
  css: string;
  defaultWidth: number;
  defaultHeight: number;
  thumbnail?: string;
}

export interface BlockInstance {
  id: string;
  templateId: string;
  name: string;
  html: string;
  css: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface WorkspaceState {
  blocks: BlockInstance[];
  selectedBlockId: string | null;
}
