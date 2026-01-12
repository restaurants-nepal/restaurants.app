import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";
import { dataBrowserRouter } from "./routes/AppRoutes";

const App = (): JSX.Element => {
  return (
    <div>
      <RouterProvider router={dataBrowserRouter} />
    </div>
  );
};

export { App };
