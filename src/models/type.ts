export interface BilimModalType {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  categoryName?: string;
  rating?: number;
  videoCount?: number;
  testCount?: number;
}

export interface VideoModalType {
  id: string;
  thumbnail: string;
  name: string;
  videoUrl: string;
  description: string;
  length?: string;
  order?: number;
}
