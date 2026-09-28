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

import AccountDropDown from "@/Comp/accountdropdown";
export default function SecondaryNav({ hideMenu, setHideMenu, subMenuItems }) {
  const { setTheme, theme } = useTheme();
  const { userinfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

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
        <AccountDropDown />
      </div>
    </section>
  );
}
