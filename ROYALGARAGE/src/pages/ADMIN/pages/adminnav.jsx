import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

import { useContext, useState } from "react";

import {
  EyeDashedIcon,
  Home,
  HomeIcon,
  LayoutDashboardIcon,
  LogOut,
  MessagesSquare,
  Moon,
  Sun,
} from "lucide-react";

{
  /* theme setter */
}
import { useTheme } from "@/Comp/theme-provider";
import { useDispatch } from "react-redux";

import { ClipboardList, PackageSearch } from "lucide-react";
import { logoutAnyone } from "@/Comp/store/authslice";

export default function AdminNav() {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col  h-screen justify-between  cursor-pointer bg-secondary  ">
      <div className=" h-3/4 section flex flex-col gap-normal">
        {/** menu  dashboard */}

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

        {/** menu  management  */}

        <button
          onClick={() => {
            navigate("management/workers");
          }}
          className={`${path.includes("/admin/management") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          Management
        </button>
        <button
          onClick={() => {
            navigate("inventory/products");
          }}
          className={`${path.includes("/admin/inventory") ? "bg-card rounded-l-2xl tracking-widest" : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          <PackageSearch
            className={`${path.includes("/admin/inventory") ? "mr-3.5 flex" : "hidden"}`}
          />
          Inventory
        </button>
        <button
          onClick={() => {
            navigate("tasks/jobs");
          }}
          className={`${path.includes("/admin/tasks") ? "bg-card rounded-l-2xl tracking-widest " : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          <ClipboardList
            className={`${path.includes("/admin/tasks") ? "mr-3.5 flex" : "hidden"}`}
          />
          Tasks
        </button>
        <button
          onClick={() => {
            navigate("messages");
          }}
          className={`${path.includes("/admin/messages") ? "bg-card rounded-l-2xl tracking-widest " : " font-bold bg-none text-header"}   w-full h-15 card flex items-center justify-center`}
        >
          <MessagesSquare
            className={`${path.includes("/admin/messages") ? "mr-3.5 flex" : "hidden"}`}
          />
          Messages
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
