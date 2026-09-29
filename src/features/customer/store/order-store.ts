import { create } from "zustand";
import type { MenuItemModel } from "@/shared/models/menu-item/menu-item-model";

export interface OrderItem extends MenuItemModel {
  qty: number;
}

interface OrderStore {
  orderItems: OrderItem[];
  kitchenRequest: string;
  isReviewOpen: boolean;
  changeQuantity: (item: MenuItemModel, amount: number) => void;
  setItemQuantity: (itemId: number, quantity: number) => void;
  setKitchenRequest: (request: string) => void;
  setReviewOpen: (isOpen: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orderItems: [],
  kitchenRequest: "",
  isReviewOpen: false,
  changeQuantity: (item, amount) =>
    set((state) => {
      const existingItem = state.orderItems.find(
        (orderItem) => orderItem.id === item.id,
      );
      const qty = Math.max(0, (existingItem?.qty ?? 0) + amount);

      if (qty === 0) {
        return {
          orderItems: state.orderItems.filter(
            (orderItem) => orderItem.id !== item.id,
          ),
        };
      }

      if (existingItem) {
        return {
          orderItems: state.orderItems.map((orderItem) =>
            orderItem.id === item.id ? { ...item, qty } : orderItem,
          ),
        };
      }

      return { orderItems: [...state.orderItems, { ...item, qty }] };
    }),
  setItemQuantity: (itemId, quantity) =>
    set((state) => ({
      orderItems:
        quantity <= 0
          ? state.orderItems.filter((item) => item.id !== itemId)
          : state.orderItems.map((item) =>
              item.id === itemId ? { ...item, qty: quantity } : item,
            ),
    })),
  setKitchenRequest: (kitchenRequest) => set({ kitchenRequest }),
  setReviewOpen: (isReviewOpen) => set({ isReviewOpen }),
}));
