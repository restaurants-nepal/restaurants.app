import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import type { SharedStorage } from "@/shared/models/shared-storage";
import { LocalStorageKeys } from "@/shared/enums/localstorage";
import type { User } from "../models/user/user-model";
import type { RestaurantContext } from "../models/restaurant-context-model";

interface SharedStorageStore extends SharedStorage {
  setSharedStorage: (fn: (draft: SharedStorage) => void) => void;
  reset: () => void;
}

const initialState: Omit<SharedStorageStore, "setSharedStorage" | "reset"> = {
  token: "",
  user: {} as User,
  fullName: "",
  policies: [],
  restaurantId: undefined,
  restaurantContext: {
    restaurant: null,
    table: null,
    menuItems: null,
  } as RestaurantContext,
};

export const useSharedStorage = create<SharedStorageStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSharedStorage: (fn) =>
        set(
          produce((draft: SharedStorage) => {
            fn(draft);
          }),
        ),

      reset: () => set(initialState),
    }),
    {
      name: LocalStorageKeys.STATE, // ✅ single localStorage key
    },
  ),
);
