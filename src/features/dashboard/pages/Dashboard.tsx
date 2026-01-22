import { routes } from "@/routes/routes";
import { Modules } from "@/shared/enums/modules";
import { PageHeader } from "@/shared/enums/page-header";
import { Pages } from "@/shared/enums/pages";
import useCan from "@/shared/hooks/useCan";
import useNavigatePage from "@/shared/hooks/useNavigatePage";
import { useSharedStorage } from "@/shared/store/shared-store";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = (): JSX.Element => {
  // functions
  const canAccessDashboard = useCan(`${Modules.PAGE}:${Pages.DASHBOARD}`);
  const navigate = useNavigate();

  // Hooks
  const navigateByRole = useNavigatePage();
  const user = useSharedStorage((state) => state.user);

  // useEffect
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PageHeader.Restaurants;

    // validation role base
    if (!canAccessDashboard) {
      if (user?.role) {
        navigateByRole(user?.role);
      } else {
        navigate(routes.login);
      }
    }

    return () => {
      document.title = prevTitle;
    };
  }, [navigate, canAccessDashboard, navigateByRole, user?.role]);

  return <div>Dashboard</div>;
};

export { Dashboard };
