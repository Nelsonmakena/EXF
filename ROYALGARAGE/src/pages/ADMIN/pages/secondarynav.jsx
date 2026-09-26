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
import { useDispatch, useSelector } from "react-redux";

import { useTheme } from "@/Comp/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logoutAnyone } from "@/store/authslice";
import { AdminMenuItems } from "@/utils/menuitems";

export default function SecondaryNav({ hideMenu, setHideMenu, subMenuItems }) {
  const { setTheme, theme } = useTheme();
  const { userinfo } = useSelector((state) => state.auth);
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
            onClick={() => setHideMenu(!hideMenu)}
            className="w-full text-primary"
          />
        </div>
        <div className="flex ">
          <ul className="flex space-x-3.5 ">
            {subMenuItems?.map((single, index) => {
              return (
                <li key={index} className=" card ">
                  <Link to={single.path}> {single.name} </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" flex items-center justify-center card cursor-pointer  rounded-full bg-muted/20 w-11 h-11">
              {userinfo.first_name && userinfo.last_name ? (
                <>
                  {" "}
                  <h1 className="text-header-foreground">
                    {userinfo?.first_name[0]?.toUpperCase()}
                  </h1>
                  <h1 className="text-header">
                    {userinfo?.last_name[0]?.toUpperCase()}
                  </h1>{" "}
                </>
              ) : (
                "user"
              )}
            </div>
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
