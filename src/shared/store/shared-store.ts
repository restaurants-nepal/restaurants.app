import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import type { SharedStorage } from "@/shared/models/shared-storage";
import { LocalStorageKeys } from "@/shared/enums/localstorage";
import type { User } from "../models/user/user-model";

interface SharedStorageStore extends SharedStorage {
  setSharedStorage: (fn: (draft: SharedStorage) => void) => void;
  reset: () => void;
}

const initialState: Partial<SharedStorage> = {
  token: "",
  user: {} as User,
  fullName: "",
  policies: [],
  restaurantId: undefined,
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
      name: LocalStorageKeys.AUTH, // ✅ single localStorage key
    },
  ),
);
