import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu, LogOut, Moon, Sun, User, User2Icon } from "lucide-react";
import { useLocation } from "react-router";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useTheme } from "@/Comp/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutAnyone } from "@/store/authslice";

export default function SecondaryNav({ hideMenu, setHideMenu }) {
  const { setTheme, theme } = useTheme();
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutAnyone());
    navigate("/admin-login");
  };
  return (
    <section className=" w-full flex items-center  ">
      <div className=" shadow-md flex items-center justify-between w-full rounded-2xl p-2 ">
        <div className="px-6">
          <Menu
            onClick={() => setHideMenus(!hideMenu)}
            className="w-full text-primary"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar size="lg">
              <AvatarImage src="" alt="image"></AvatarImage>
              <AvatarFallback>cn</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={"w-2xs shadow-none p-3.5 flex flex-col  gap-normal  "}
          >
            <DropdownMenuItem className={"flex justify-between"}>
              {" "}
              <User2Icon /> profile
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuGroup className="flex justify-between">
              <DropdownMenuItem
                onClick={() => {
                  setTheme("dark");
                }}
              >
                <Moon
                  className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setTheme("light");
                }}
              >
                <Sun
                  className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem
              className={"flex justify-between font-bold"}
              variant="destructive"
              onClick={() => {
                logout();
              }}
            >
              logout
              <LogOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
