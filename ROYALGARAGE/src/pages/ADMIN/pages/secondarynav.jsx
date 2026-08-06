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
import { logoutanyone } from "@/Comp/store/authslice";
import { useTheme } from "@/comp/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SecondaryNav({ hidemenu, Sethidemenu }) {
  const { setTheme, theme } = useTheme();
  const location = useLocation();
  const path = location.pathname;
  const [ProfileMenu, SetProfileMenu] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutanyone());
    navigate("/");
  };
  return (
    <section className=" w-full flex items-center  ">
      <div className=" shadow-md flex items-center justify-between w-full rounded-2xl p-2 ">
        <div className="px-6">
          <Menu
            onClick={() => Sethidemenu(!hidemenu)}
            className="w-full text-primary"
          />
        </div>

        {/*mamangemnt items  */}
        <div
          className={`${path.includes("/admin/managment") ? "flex " : "hidden "} `}
        >
          <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
            <li className="card">
              <Link to="managment/workers"> Workers </Link>
            </li>
            <li className="card">
              <Link to=""> Clients </Link>
            </li>
            <li className="card">
              <Link to="managment/roles"> Roles </Link>
            </li>
          </ul>
        </div>
        {/*inventory  items  */}
        <div
          className={`${path.includes("/admin/inventory") ? "flex " : "hidden "} `}
        >
          <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
            <li className="card">
              <Link to="inventory/products"> Products </Link>
            </li>
            <li className="card">
              <Link to="inventory/services"> Services </Link>
            </li>
          </ul>
        </div>
        {/* tasks items */}
        <div
          className={`${path.includes("/admin/tasks") ? "flex " : "hidden "} `}
        >
          <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
            <li className="card">
              <Link to="tasks/jobs"> Jobs </Link>
            </li>
            <li className="card">
              <Link to=""> Completed </Link>
            </li>
          </ul>
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
