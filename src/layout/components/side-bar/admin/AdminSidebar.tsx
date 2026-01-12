import type { JSX } from "react";
import styles from "./admin-sidebar.module.scss";
import AdminMenuItems from "./AdminMenuItems";

const AdminSidebar = (): JSX.Element => {
  // constants

  return (
    <div className={styles.adminSidebar}>
      <div className={styles.imageContainer}>
        <img
          src="https://www.shutterstock.com/image-vector/hamburger-concept-simple-minimalist-modern-600nw-2477192977.jpg"
          width="50px"
          height="50px"
          className={styles.logo}
        />
      </div>
      <div className={styles.menuItemsContainer}>
        <AdminMenuItems />
      </div>
    </div>
  );
};

export default AdminSidebar;
