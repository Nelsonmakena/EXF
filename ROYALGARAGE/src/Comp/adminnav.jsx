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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
{
  /* theme setter */
}
import { useTheme } from "@/Comp/theme-provider";
import { useDispatch } from "react-redux";

import { ClipboardList, PackageSearch } from "lucide-react";
import { logoutAnyone } from "@/store/authslice";

export default function AdminNav({ menuItems }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  return (
    <div className="flex flex-col  h-screen justify-between  cursor-pointer bg-secondary  ">
      <div className=" h-3/4 section flex flex-col gap-normal">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenu key={item.name}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`w-full h-15  flex items-center gap-7 px-4 ${
                    path === item.path
                      ? "bg-card rounded-l-2xl tracking-widest"
                      : "font-bold bg-none text-header"
                  }`}
                >
                  <Icon className="" />
                  {item.name}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="right" align="start" className="w-52">
                {item.subMenu.map((subItem) => {
                  const SubIcon = subItem.icon;

                  return (
                    <DropdownMenuItem
                      key={subItem.path}
                      onClick={() => navigate(subItem.path)}
                    >
                      <SubIcon />
                      {subItem.name}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
    </div>
  );
}
