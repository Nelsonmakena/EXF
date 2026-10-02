import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../../store/authslice";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import ProfileEdit from "../profileEdit";

export default function Authenticated({ children }) {
  const { isLoading, isAuthenticated, userinfo } = useSelector(
    (state) => state.auth,
  );
  const location = useLocation();
  //always checking auth status
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, location.pathname]);

  const path = location.pathname;
  console.log(isLoading);

  if (isLoading) {
    return <h1>loading</h1>;
  }
  const role = userinfo?.role;
  const firstTime = userinfo?.first_time_login;

  if (!isAuthenticated) {
    if (location.pathname.includes("/admin")) {
      return <Navigate to="/admin-login" />;
    }
    if (location.pathname.includes("/client")) {
      return <Navigate to="/login" />;
    }
    if (location.pathname.includes("/w001")) {
      return <Navigate to="/wk" />;
    }
    if (location.pathname.includes("/misc")) {
      return <Navigate to="/sys" />;
    }
  }

  if (
    isAuthenticated &&
    (path === "/login" ||
      path === "/admin-login" ||
      path === "/wk" ||
      path === "/sys")
  ) {
    if (role === "admin") return <Navigate to="/admin/home" replace />;
    if (role === "client") return <Navigate to="/client/dashboard" replace />;
    if (role === "employee") return <Navigate to="/w001/dashboard" replace />;
    if (role === "super-admin")
      return <Navigate to="/misc/dashboard" replace />;
  }
  // if (isAuthenticated && firstTime) {
  //   if (role === "employee") return <ProfileEdit />;
  // }
  //role based auth

  if (role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/admin/home" />;
  }

  if (role === "client" && !path.startsWith("/client")) {
    return <Navigate to="/client/dashboard" />;
  }

  if (role === "employee" && !path.startsWith("/w001")) {
    return <Navigate to="notauthorized" />;
  }
  return <>{children}</>;
}
