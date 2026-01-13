import { routes } from "@/routes/routes";
import { Modules } from "@/shared/enums/modules";
import { PageHeader } from "@/shared/enums/page-header";
import { Pages } from "@/shared/enums/pages";
import useCan from "@/shared/hooks/useCan";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = (): JSX.Element => {
  // functions
  const canAccessDashboard = useCan(`${Modules.PAGE}:${Pages.DASHBOARD}`);
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PageHeader.Restaurants;

    // validation role base
    if (!canAccessDashboard) {
      navigate(`${routes.accessDenied}`);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [navigate, canAccessDashboard]);

  return <div>Dashboard</div>;
};

export { Dashboard };
