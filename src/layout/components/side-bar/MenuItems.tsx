import { SettingIcon } from "@/assets/icons/SettingIcon";
import styles from "./side-bar.module.scss";
import { startCase } from "lodash";
import HomeIcon from "@/assets/icons/HomeIcon";
import NavItem from "./NavItem";
import ItemIcon from "@/assets/icons/Item";
import RestaurantTableIcon from "@/assets/icons/RestaurantTable";
import { routes } from "@/routes/routes";

const menuItems = [
  { name: "dashboard", to: `${routes.dashboard}`, icon: <HomeIcon /> },
  {
    name: "Tables",
    to: `${routes.restaurantTables}`,
    icon: <RestaurantTableIcon />,
  },
  { name: "settings", to: `${routes.settings}`, icon: <SettingIcon /> },
  { name: "items", to: `${routes.menuItems}`, icon: <ItemIcon /> },
];

export const MenuItems = () => {
  return (
    <div className={styles.menuItemContainer}>
      {menuItems.map((menu) => (
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
