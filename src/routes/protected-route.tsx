import type { PropsWithChildren } from "react";
import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "./auth";

export const ProtectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const authenticated = useIsAuthenticated();

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <Navigate
      to={"/login"}
      state={{
        redirectUrl: window.location.pathname + window.location.search,
      }}
    />
  );
};
