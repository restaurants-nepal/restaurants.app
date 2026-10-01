import { useNotificationStore } from "@/shared/store/notification-store";
import { Box, Badge } from "@chakra-ui/react";
import { Bell } from "lucide-react";

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  return (
    <Box
      position="relative"
      display="inline-block">
      <Bell />
      {notifications?.length > 0 && (
        <Badge
          position="absolute"
          top="-2"
          right="3"
          color="red"
          colorScheme="red"
          borderRadius="full"
          size="xs"
          px={1.5}>
          {notifications.length}
        </Badge>
      )}
    </Box>
  );
};

export { Notification };
