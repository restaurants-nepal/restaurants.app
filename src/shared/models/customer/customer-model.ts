import type { MenuItemModel } from "../menu-item/menu-item-model";

export interface CustomerOrderModel {
  resId: number;
  tableId: number;
  customerName: string;
  customerPhone: string;
  items: MenuItemModel[];
  note?: string;
}
