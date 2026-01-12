import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Flex } from "@chakra-ui/react";

const AdminLayout = () => {
  return (
    <Flex>
      <AdminSidebar />
      <Outlet />
    </Flex>
  );
};

export default AdminLayout;
