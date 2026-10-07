import type { MenuItemModel } from "../menu-item/menu-item-model";

export interface CustomerOrderModel {
  resId: number;
  tableId: number;
  customerName: string;
  customerPhone: string;
  items: MenuItemModel[];
  note?: string;
}

export interface CustomerOrderHistoryItem {
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}

export interface CustomerOrderHistory {
  orderNumber: string;
  menuItems: CustomerOrderHistoryItem[];
  subTotal: number;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  orderDate: string;
}
