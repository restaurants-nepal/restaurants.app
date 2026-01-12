import { startCase } from "lodash";
import NavItem from "../NavItem";
import styles from "./admin-sidebar.module.scss";
import HomeIcon from "@/assets/icons/HomeIcon";
import { routes } from "@/routes/routes";

const AdminMenuItems = () => {
  const adminSidebars = [
    {
      name: "Restaurants",
      to: `${routes.admin.name}/${routes.admin.restaurants}`,
      icon: <HomeIcon />,
    },
  ];

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
