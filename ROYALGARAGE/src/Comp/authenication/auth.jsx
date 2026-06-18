import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Globalcontext } from "../../context";

export default function Authenicated({ children }) {
  const { Isloggedin, Role } = useContext(Globalcontext);

  const location = useLocation();
  const path = location.pathname;
  if (!Isloggedin) {
    if (location.pathname.includes("/admin")) {
      return <Navigate to="/adminlogin" />;
    }
    if (location.pathname.includes("/client")) {
      return <Navigate to="/login" />;
    }
    if (location.pathname.includes("/wk-hm")) {
      return <Navigate to="/wk" />;
    }
  }

  if (
    Isloggedin &&
    (path === "/login" || path === "/adminlogin" || path === "/wk")
  ) {
    if (Role === "admin") return <Navigate to="/admin/home" replace />;
    if (Role === "client") return <Navigate to="/client/dashboard" replace />;
    if (Role === "worker") return <Navigate to="/wk-hm" replace />;
  }

  /// role based auth

  if (Role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/nt" />;
  }

  if (Role === "client" && !path.startsWith("/client")) {
    return <Navigate to="/nt" />;
  }

  if (Role === "worker" && !path.startsWith("/wk-hm")) {
    return <Navigate to="/nt" />;
  }
  return <>{children}</>;
}
