import type { MenuItemModel } from "./menu-item/menu-item-model";
import type { Restaurant } from "./Restaurant/restaurant";
import type { ResTableModel } from "./tables/res-table-model";

export interface RestaurantContext {
  restaurant: Restaurant | null;
  table: ResTableModel | null;
  menuItems: MenuItemModel[] | null;
}
