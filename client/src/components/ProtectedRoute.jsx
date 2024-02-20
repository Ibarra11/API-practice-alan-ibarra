import { useAuthContext } from "./Auth/AuthProvider";
import { Outlet, Navigate } from "react-router-dom";
export default function ProtectedRouter() {
  const { auth } = useAuthContext();

  return auth.accessToken ? <Outlet /> : <Navigate to="/auth/login" />;
}
