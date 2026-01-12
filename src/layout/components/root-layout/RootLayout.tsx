import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../top-bar/TopBar";
import styles from "./root-layout.module.scss";

const RootLayout = (): JSX.Element => {
  return (
    <div>
      <TopBar />

      <div className={styles.mainContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export { RootLayout };
