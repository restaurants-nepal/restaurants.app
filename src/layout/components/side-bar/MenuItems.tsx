import { SettingIcon } from "@/assets/icons/SettingIcon";
import styles from "./side-bar.module.scss";
import { startCase } from "lodash";
import HomeIcon from "@/assets/icons/HomeIcon";
import NavItem from "./NavItem";
import ItemIcon from "@/assets/icons/Item";

const menuItems = [
  { name: "dashboard", to: "/dashboard", icon: <HomeIcon /> },
  { name: "settings", to: "/settings", icon: <SettingIcon /> },
  { name: "items", to: "menu-items", icon: <ItemIcon /> },
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
