import { routes } from "@/routes/routes";
import useCan from "@/shared/hooks/useCan";
import { useEffect, type JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuItems } from "../services/menu-items";

const RestaurantTables = (): JSX.Element => {
  const canViewRestaurantTable = useCan("page:restaurantTables");
  const navigate = useNavigate();
  const restaurantTableId = useLocation().pathname.split("/").pop();

  // Services
  const menuItems = useMenuItems(restaurantTableId || "");

  console.log("Restaurant Table ID:", menuItems);

  // useEffect
  useEffect(() => {
    if (!canViewRestaurantTable) {
      navigate(`${routes.dashboard}`);
    }
  }, [navigate, canViewRestaurantTable]);

  return <div>Restaurant Tables</div>;
};

export default RestaurantTables;
