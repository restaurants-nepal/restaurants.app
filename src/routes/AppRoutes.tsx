import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./routes";
import { ProtectedRoute } from "./protected-route";
import { GlobalLayout } from "@/layout/GlobalLayout";
import { HomeLayout } from "@/layout/components/main-content/MainContent";
import { Login } from "@/features/auth/pages/Login";
import { RootLayout } from "@/layout/components/root-layout/RootLayout";
import AdminLayout from "@/layout/components/side-bar/admin/AdminLayout";
import AdminRestaurant from "@/features/super-admin/pages/restaurant/Restaurant";
import CustomerLayout from "@/features/customer/pages/CustomerLayout";
import LandingPage from "@/features/customer/pages/LandingPage";
import RestaurantTables from "@/features/restaurant-users/pages/restaurant-tables/RestaurantTable";
import { Dashboard } from "@/features/restaurant-users/pages/dashboard/Dashboard";
import { Setting } from "@/features/restaurant-users/pages/settings/Setting";
import { MenuItems } from "@/layout/components/side-bar/MenuItems";

export const dataBrowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<GlobalLayout />}
      shouldRevalidate={() => true}
      errorElement={<>ERROR PAGE</>}>
      {/* 🔓 Public */}
      <Route
        path={routes.login}
        element={<Login />}
      />

      {/* 🍔 Restaurant Table */}
      <Route
        path={`${routes.restaurantTables.name}${routes.restaurantTables.params.name}`}
        element={<RestaurantTables />}
      />

      {/* 🔐 Protected */}
      <Route
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }>
        {/* ✅ ROOT REDIRECT */}
        <Route
          path="/"
          element={
            <Navigate
              to={routes.dashboard}
              replace
            />
          }
        />

        {/* 👤 Customer Pages */}
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

        {/* 🏠 Main App Pages */}
        <Route element={<HomeLayout />}>
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
            path = {routes.restaurantTables.name}
            element={<RestaurantTables />}
          />
        </Route>

        {/* 👑 Admin Pages */}
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
