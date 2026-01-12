import { useSharedStorage } from "@/shared/store/shared-store";

export const useIsAuthenticated = () => {
  const token = useSharedStorage((state) => state.token);
  return Boolean(token);
};
