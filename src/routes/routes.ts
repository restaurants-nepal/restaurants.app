const routes = {
  dashboard: "/dashboard",
  sales: "/sales",
  report: "/report",
  login: "/login",
  chat: "/chat",
  products: "/products",
  settings: "/settings",
  accessDenied: "/access-denied",
  restaurantTables: {
    name: "/restaurant-tables",
    params: {
      name: "/:restaurant-id",
    },
  },
  admin: {
    name: "/admin",
    restaurants: "restaurants",
  },
  customer: {
    name: "/customer",
    landingPage: "landingPage",
  },
};

export { routes };
