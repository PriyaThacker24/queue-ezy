import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAdminAuthed } from "../auth/adminAuth";

export function RequireAdminAuth() {
  const location = useLocation();

  if (!isAdminAuthed()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

