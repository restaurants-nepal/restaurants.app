import apiInstance from "@/shared/api/baseApi";
import useSWR from "swr";
import { MenuItems } from "./routes";
import type { MenuItemModel } from "@/shared/models/menu-item/menu-item-model";

export const useMenuItems = (
  resId: string,
): { data: MenuItemModel[] | undefined; error: unknown } => {
  const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);
  const { data, error } = useSWR(resId ? MenuItems.get(resId) : null, fetcher);

  return { data: data?.data, error };
};
