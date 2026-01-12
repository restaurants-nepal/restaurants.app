import type { User } from "./user/user-model";

export interface SharedStorage {
  token?: string | undefined | null;
  fullName?: string | undefined | null;
  user?: User;
  policies?: string[];
  setSharedStorage: (newValue: (state: SharedStorage) => void) => void;
  reset: () => void;
}
