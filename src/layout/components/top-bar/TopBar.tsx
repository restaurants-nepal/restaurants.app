import type { JSX } from "react";
import styles from "./top-bar.module.scss";
import HomeIcon from "@/assets/icons/HomeIcon";
import { DropDownIcon } from "@/assets/icons/DropDown";
import { Menu, Portal } from "@chakra-ui/react";
import { routes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useSharedStorage } from "@/shared/store/shared-store";
import { Notification } from "./Notification";

const TopBar = (): JSX.Element => {
  // storage
  const fullName = useSharedStorage((state) => state.fullName);
  const reset = useSharedStorage((state) => state.reset);
  // Functions
  const navigate = useNavigate();
  const logoutHandler = () => {
    reset();
    navigate(routes.login);
  };
  const MenuItems = [{ label: "Logout", key: "logout", action: logoutHandler }];
  return (
    <nav className={styles.mainContainer}>
      <button className={styles.homeIcon}>
        <HomeIcon />
      </button>
      <div className={styles.leftContent}>
        <Notification />
        <div className={styles.userName}>{`${fullName || ""}`}</div>
        <Menu.Root>
          <Menu.Trigger asChild>
            <button className={styles.dropIcon}>
              <DropDownIcon />
            </button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {MenuItems.map((m) => (
                  <Menu.Item
                    key={m.key}
                    onClick={() => {
                      m.action();
                    }}
                    value={m.key}>
                    {m.label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
    </nav>
  );
};

export default TopBar;
