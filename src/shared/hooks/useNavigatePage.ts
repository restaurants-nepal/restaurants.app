import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Roles } from "../enums/roles";
import { routes } from "@/routes/routes";

const useNavigatePage = () => {
  const navigate = useNavigate();
  return useCallback(
    (role: Roles) => {
      switch (role) {
        case Roles.SUPER_ADMIN:
          navigate(`${routes.admin.name}/${routes.admin.restaurants}`, {
            replace: true,
          });
          break;

        case Roles.RESTAURANT_ADMIN:
          navigate(routes.dashboard, { replace: true });
          break;

        case Roles.CUSTOMER:
          navigate(`${routes.customer.name}/${routes.customer.landingPage}`);
          break;
      }
    },
    [navigate],
  );
};

export default useNavigatePage;
