/* eslint-disable no-console */
import apiInstance from "@/shared/api/baseApi";
import { Restaurant as RestaurantRoute } from "./routes";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";
import { useEffect } from "react";
import type { Restaurant } from "@/shared/models/Restaurant/restaurant";

export const useRestaurant = (restaurantId?: number): Restaurant => {
  const navigate = useNavigate();
  const fetcher = (url: string) => apiInstance.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    restaurantId ? RestaurantRoute.get(restaurantId) : null,
    fetcher,
  );

  useEffect(() => {
    if (error?.response?.status === 401) {
      console.warn("⚠️ Unauthorized! Redirecting to login...");
      navigate(routes.login);
    }
  }, [error, navigate]);

  return data?.data;
};
