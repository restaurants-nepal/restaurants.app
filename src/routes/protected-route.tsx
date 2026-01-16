import type { PropsWithChildren } from "react";
import { useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "./auth";
import { routes } from "./routes";

export const ProtectedRoute = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const authenticated = useIsAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) navigate(`${routes.login}`);
  }, [navigate, authenticated]);
  return <>{children}</>;
};
