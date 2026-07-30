import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

import { useContext, useState } from "react";

import {
  EyeDashedIcon,
  Home,
  HomeIcon,
  LayoutDashboardIcon,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

{
  /* theme setter */
}
import { useTheme } from "@/comp/theme-provider";
import { useDispatch } from "react-redux";
import { logoutanyone } from "@/Comp/store/authslice";
import { Home01 } from "@untitledui/icons";

export default function AdminNav() {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const [UserAccountSmallMenu, SetUserAccountSmallMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutanyone()).then(navigate("/adminlogin"));
  };
  console.log(path);

  return (
    <div className="flex flex-col  h-screen justify-between  cursor-pointer bg-secondary  ">
      <div className=" h-3/4 section flex flex-col gap-normal">
        {/** menu  dahsboard */}

        <button
          onClick={() => {
            navigate("home");
          }}
          className={`${path === "/admin/home" ? "bg-card rounded-l-2xl tracking-widest  " : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          <LayoutDashboardIcon
            className={`${path === "/admin/home" ? "mr-3.5 flex" : "hidden"}`}
          />
          Dashboard
        </button>

        {/** menu  managnment  */}

        <button
          onClick={() => {
            navigate("managment/workers");
          }}
          className={`${path.includes("/admin/managment") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Managment
        </button>
        <button
          onClick={() => {
            navigate("inventory/products");
          }}
          className={`${path.includes("/admin/inventory") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Inventory
        </button>
        <button
          onClick={() => {
            navigate("tasks/jobs");
          }}
          className={`${path.includes("/admin/tasks") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Tasks
        </button>
        <button
          onClick={() => {
            navigate("tasks/jobs");
          }}
          // className={`${path.includes("/admin/tasks") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Finance
        </button>
        <button
          onClick={() => {
            navigate("tasks/jobs");
          }}
          // className={`${path.includes("/admin/tasks") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Reports
        </button>
      </div>
    </div>
  );
}
