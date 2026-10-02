import { socket } from "@/shared/api/socket";
import { useNotificationStore } from "@/shared/store/notification-store";
import { useSharedStorage } from "@/shared/store/shared-store";
import { Box, Badge, Float, Menu, Portal, Icon } from "@chakra-ui/react";
import { Bell, X } from "lucide-react";
import { useState } from "react";

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const resId = useSharedStorage((state) => state.restaurantId);
  const [open, setOpen] = useState(false);
  const handleDismissNotification = (tableId: string) => {
    socket.emit("dismiss-waiter-call", { tableId, resId });
    const hasNotification = notifications?.length > 0;
    setOpen(hasNotification);
  };
  return (
    <Box
      position="relative"
      display="inline-block">
      <Menu.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}>
        <Menu.Trigger asChild>
          <div style={{ cursor: "pointer" }}>
            <Icon
              rounded="full"
              size="md"
              aria-label="Notifications">
              <Bell color="white" />
            </Icon>
            <Float
              placement="top-end"
              style={{ position: "absolute" }}>
              {notifications?.length > 0 && (
                <Badge
                  bg="red.500"
                  color="white"
                  size="xs">
                  {notifications.length}
                </Badge>
              )}
            </Float>
          </div>
        </Menu.Trigger>

        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {notifications?.length > 0 ? (
                notifications.map((notification) => (
                  <Menu.Item
                    value={notification.tableId}
                    key={notification.tableId}>
                    {notification.message}

                    <X
                      type="button"
                      size="15"
                      color="red"
                      cursor="pointer"
                      onClick={() =>
                        handleDismissNotification(notification.tableId)
                      }
                    />
                  </Menu.Item>
                ))
              ) : (
                <Menu.Item value="no-notifications">No notifications</Menu.Item>
              )}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
};

export { Notification };
