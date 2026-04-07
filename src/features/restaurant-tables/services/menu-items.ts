import apiInstance from "@/shared/api/baseApi";
import useSWR from "swr";
import { MenuItems } from "./routes";

export const useMenuItems = (tableId: string) => {
  const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    tableId ? MenuItems.get(tableId) : null,
    fetcher,
  );

  return { data: data?.data, error };
};
