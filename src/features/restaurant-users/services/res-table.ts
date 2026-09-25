import apiInstance from "@/shared/api/baseApi";
import useSWR from "swr";
import { ResTables } from "./routes";
import type { ResTableModel } from "@/shared/models/tables/res-table-model";

export const useResTables = (
  resId: string,
): { data: ResTableModel[] | undefined; error: unknown } => {
  const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);
  const { data, error } = useSWR(resId ? ResTables.get(resId) : null, fetcher);

  return { data: data?.data, error };
};
