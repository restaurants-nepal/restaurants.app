import type { JSX } from "react";
import styles from "./top-bar.module.scss";
import HomeIcon from "@/assets/icons/HomeIcon";
import { DropDownIcon } from "@/assets/icons/DropDown";
import { Flex, Menu, Portal } from "@chakra-ui/react";
import { routes } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { useSharedStorage } from "@/shared/store/shared-store";
import { Notification } from "./Notification";
import { useRestaurant } from "@/shared/services/restaurants/get-restaurant";
import { Text } from "@chakra-ui/react";

const TopBar = (): JSX.Element => {
  // storage
  const restaurantId = useSharedStorage((state) => state.restaurantId);
  const fullName = useSharedStorage((state) => state.fullName);
  const reset = useSharedStorage((state) => state.reset);

  const data = useRestaurant(restaurantId);
  // Functions
  const navigate = useNavigate();
  const logoutHandler = () => {
    reset();
    navigate(routes.login);
  };
  const MenuItems = [{ label: "Logout", key: "logout", action: logoutHandler }];
  return (
    <nav className={styles.mainContainer}>
      <Flex>
        <button className={styles.homeIcon}>
          <HomeIcon />
        </button>
        <div className={styles.topBarLeftContent}>
          <Text>{data?.name}</Text>
        </div>
      </Flex>
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
