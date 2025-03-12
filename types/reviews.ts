export interface Review {
  id: string;
  userId: string;
  comment: string;
  rating: number;
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
}