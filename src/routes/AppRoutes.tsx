import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute } from "./protected-route";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { HomeLayout } from "@/layout/components/main-content/MainContent";
import { Dashboard } from "@/features/dashboard/pages/Dashboard";
import { Login } from "@/features/auth/pages/Login";
import { RootLayout } from "@/layout/components/root-layout/RootLayout";
import { MenuItems } from "@/features/menu-items/pages/MenuItems";
import { Setting } from "@/features/settings/pages/Setting";
import AdminLayout from "@/layout/components/side-bar/admin/AdminLayout";
import AdminRestaurant from "@/features/super-admin/pages/restaurant/Restaurant";
import CustomerLayout from "@/features/customer/pages/CustomerLayout";
import LandingPage from "@/features/customer/pages/LandingPage";
import RestaurantTables from "@/features/restaurant-tables/pages/RestaurantTable";

export const dataBrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<GlobalLayout />}
      shouldRevalidate={() => true}
      errorElement={<>ERROR PAGE</>}>
      <Route
        path={routes.login}
        element={<Login />}
      />
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }>
        {/* Customer Pages */}
        <Route
          path={routes.customer.name}
          element={<CustomerLayout />}>
          <Route
            path={routes.customer.landingPage}
            element={<LandingPage />}
          />
          <Route
            path="*"
            element={<LandingPage />}
          />
        </Route>

        <Route element={<HomeLayout />}>
          {/* <Route
            path="/"
            element={<Dashboard />}
          /> */}
          <Route
            path={routes.dashboard}
            element={<Dashboard />}
          />
          <Route
            path={routes.settings}
            element={<Setting />}
          />
          <Route
            path={routes.report}
            element={<>This is report page.</>}
          />
          <Route
            path={routes.chat}
            element={<>This is chat page</>}
          />
          <Route
            path={routes.menuItems}
            element={<MenuItems />}
          />
          <Route
            path={routes.restaurantTables.name}
            element={<RestaurantTables />}
          />
          {/* <Route
            path="*"
            element={<Dashboard />}
          /> */}
        </Route>

        {/* Admin Pages  */}
        <Route
          path={routes.admin.name}
          element={<AdminLayout />}>
          <Route
            path={routes.admin.restaurants}
            element={<AdminRestaurant />}
          />
        </Route>
      </Route>
    </Route>,
  ),
);
