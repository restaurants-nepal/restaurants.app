import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../side-bar/SideBar";
import { Flex } from "@chakra-ui/react";
import styles from "./main-contain.module.scss";

const HomeLayout = (): JSX.Element => {
  return (
    <Flex>
      <SideBar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </Flex>
  );
};

export { HomeLayout };
