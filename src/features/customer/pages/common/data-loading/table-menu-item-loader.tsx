import apiInstance from "@/shared/api/baseApi";
import type { LoaderFunctionArgs } from "react-router-dom";

export const tableMenuItemsLoader = async ({ params }: LoaderFunctionArgs) => {
  const token = params.token;

  if (!token) {
    throw new Response("Missing table token", { status: 400 });
  }

  const url = `/v1/restaurant-table/${encodeURIComponent(token)}`;
  const response = await apiInstance.get(url);
  return response.data.data;
};
