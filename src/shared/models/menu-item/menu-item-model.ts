export interface MenuItemModel {
  description: string;
  estimated_preparation_time_minutes: number;
  id: number;
  images: string[];
  is_available: boolean;
  name: string;
  price: string;
  restaurant_id: number;
  category: string;
}
