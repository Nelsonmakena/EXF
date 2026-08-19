import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import Loader from "../loader";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/authslice";
import { useEffect } from "react";

export default function Authenticated({ children }) {
  //always checking auth status
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const { isLoading, Role, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const location = useLocation();
  const path = location.pathname;
  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated) {
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
    isAuthenticated &&
    (path === "/login" || path === "/adminlogin" || path === "/wk")
  ) {
    if (Role === "admin") return <Navigate to="/admin/home" replace />;
    if (Role === "client") return <Navigate to="/client/dashboard" replace />;
    if (Role === "worker") return <Navigate to="/wk-hm" replace />;
  }

  //role based auth

  if (Role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/admin/home" />;
  }

  if (Role === "client" && !path.startsWith("/client")) {
    return <Navigate to="/client/dashboard" />;
  }

  if (Role === "worker" && !path.startsWith("/w001")) {
    return <Navigate to="notauthorized" />;
  }
  return <>{children}</>;
}
