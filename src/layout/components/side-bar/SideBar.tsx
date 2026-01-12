import type { JSX } from "react";
import styles from "./side-bar.module.scss";
import { MenuItems } from "./MenuItems";

const SideBar = (): JSX.Element => {
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.imageContainer}>
        <img
          src="https://www.shutterstock.com/image-vector/hamburger-concept-simple-minimalist-modern-600nw-2477192977.jpg"
          width="50px"
          height="50px"
          className={styles.logo}
        />
      </div>
      <div className={styles.menuItemsContainer}>
        <MenuItems />
      </div>
    </div>
  );
};

export default SideBar;
