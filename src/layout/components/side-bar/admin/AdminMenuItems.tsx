import { startCase } from "lodash";
import NavItem from "../NavItem";
import styles from "./admin-sidebar.module.scss";
import HomeIcon from "@/assets/icons/HomeIcon";
import { routes } from "@/routes/routes";
import useCan from "@/shared/hooks/useCan";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modules } from "@/shared/enums/modules";
import { Pages } from "@/shared/enums/pages";

const AdminMenuItems = () => {
  // functions
  const navigate = useNavigate();

  // hooks
  const canAccessSuperAdminPage = useCan(
    `${Modules.PAGE}:${Pages.RESTAURANTS}`,
  );
  const adminSidebars = [
    {
      name: "Restaurants",
      to: `${routes.admin.name}/${routes.admin.restaurants}`,
      icon: <HomeIcon />,
    },
  ];

  // check if this user has permission to view admin pages or not
  useEffect(() => {
    if (!canAccessSuperAdminPage) {
      navigate(`${routes.dashboard}`, { replace: true });
    }
  }, [canAccessSuperAdminPage, navigate]);

  return (
    <div className={styles.menuItemContainer}>
      {adminSidebars.map((menu) => (
        <div key={menu.name}>
          <NavItem to={menu.to}>
            <div className={styles.navItem}>
              <div>{menu.icon}</div>
              <div>{startCase(menu.name)}</div>
            </div>
          </NavItem>
        </div>
      ))}
    </div>
  );
};

export default AdminMenuItems;
