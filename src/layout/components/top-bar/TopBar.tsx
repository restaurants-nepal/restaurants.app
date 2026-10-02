import { useEffect, type JSX } from "react";
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
import { Tooltip } from "@/shared/components/tooltip/tooltip";
import { useNotificationStore } from "@/shared/store/notification-store";
import { socket } from "@/shared/api/socket";

const TopBar = (): JSX.Element => {
  // storage
  const resId = useSharedStorage((state) => state.restaurantId);
  const fullName = useSharedStorage((state) => state.fullName);
  const reset = useSharedStorage((state) => state.reset);
  const role = useSharedStorage((state) => state.user?.role);

  const data = useRestaurant(resId);
  // Functions
  const navigate = useNavigate();
  const logoutHandler = () => {
    reset();
    navigate(routes.login);
  };

  // Waiter Logics

  const isWaiter = role === ("waiter" as string);
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  useEffect(() => {
    if (isWaiter) {
      socket.connect();

      socket.emit("waiter:join", {
        resId,
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [resId, isWaiter]);

  useEffect(() => {
    const handleWaiterCall = (data) => {
      addNotification({
        message: data?.message,
        tableId: data?.tableId,
      });
      // Show notification
    };

    socket.on("waiter:called", handleWaiterCall);

    return () => {
      socket.off("waiter:called", handleWaiterCall);
    };
  }, [addNotification]);

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
        <Tooltip
          content={role}
          showArrow>
          <div className={styles.userName}>{`${fullName || ""}`}</div>
        </Tooltip>
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
