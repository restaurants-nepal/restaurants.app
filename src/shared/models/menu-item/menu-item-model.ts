import type { ImageModel } from "../image-model";

export interface MenuItemModel {
  description: string;
  estimated_preparation_time_minutes: number;
  id: number;
  images: ImageModel[];
  is_available: boolean;
  name: string;
  price: string;
  restaurant_id: number;
  category: string;
}
