import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 1. Define State Types
interface UserSlice {
  user: { name: string; email: string } | null;
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
}

interface Notification {
  message: string;
  id: string;
}

interface NotificationSlice {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

interface ThemeSlice {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// Combined State Type
type StoreState = UserSlice & ThemeSlice & NotificationSlice;

// 2. Initial States (for clean resets)
const initialUserState = { user: null };
const initialThemeState = { theme: "light" as const };
const initialNotificationState = { notifications: [] };

// 3. Create Store
export const useNotificationStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        // User Slice
        ...initialUserState,
        setUser: (user) => set({ user }, false, "user/setUser"),
        logout: () => set(initialUserState, false, "user/logout"),

        // Notification Slice
        ...initialNotificationState,
        addNotification: (notification) =>
          set(
            (state) => ({
              notifications: [...state.notifications, notification],
            }),
            false,
            "addNotification",
          ),

        // Theme Slice
        ...initialThemeState,
        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === "light" ? "dark" : "light" }),
            false,
            "theme/toggleTheme",
          ),
      }),
      {
        name: "app-storage", // localStorage key
        partialize: (state) => ({ theme: state.theme }), // persist ONLY theme, keep user in memory
      },
    ),
  ),
);
