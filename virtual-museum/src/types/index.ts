export interface Exhibit {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
}

export interface Gallery {
  id: string;
  title: string;
  description: string;
  template: 'classic' | 'modern';
  exhibits: Exhibit[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  shareId?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  galleries: string[];
}

export type GalleryTemplate = 'classic' | 'modern';
