import { routes } from "@/routes/routes";
import useCan from "@/shared/hooks/useCan";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

const RestaurantTables = (): JSX.Element => {
  const canViewRestaurantTable = useCan("page:restaurantTables");
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    if (!canViewRestaurantTable) {
      navigate(`${routes.dashboard}`);
    }
  }, [navigate, canViewRestaurantTable]);

  return <div>Restaurant Tables</div>;
};

export default RestaurantTables;
