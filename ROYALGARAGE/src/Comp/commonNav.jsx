import AccountDropDown from "./accountdropdown";
import logo from "/src/assets/images/logo.png";
import { Link, useNavigate } from "react-router";
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
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/Comp/theme-provider";

export default function CommonNav({ menuItems, homePath }) {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  return (
    <>
      <div className="hidden   md:flex items-center justify-center text-sm  w-full   font-semibold h-20  overflow-hidden ">
        <nav className="  w-3/4    relative h-17.5 md:flex items-center    text-black transition-all  shadow-md rounded-2xl  px-1.5">
          {/* big-screen menu  */}{" "}
          <div className="hidden md:flex w-full justify-between">
            <div
              className="flex items-center"
              onClick={() => {
                navigate(`${homePath}`);
              }}
            >
              <img src={logo} alt="logo" className="h-16 w-16 " />
            </div>
            <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
              {menuItems.map((menu) => {
                return (
                  <li className="card">
                    <Link to={menu.Path}> {menu.name} </Link>
                  </li>
                );
              })}
            </ul>
            <AccountDropDown />
          </div>
        </nav>
      </div>
      {/* small-screen menu  */}
      <div className=" shadow-md rounded-2xl flex h-20  w-full  items-center justify-between md:hidden px-3.5">
        <div
          onClick={() => {
            navigate(`${homePath}`);
          }}
          className=""
        >
          <h1 className="text-orange-700  font-bold text-xl ">
            Royal <span className="text-blue-400">Auto </span>
            <span className="text-green-700 text-shadow-xs"> Garage </span>{" "}
          </h1>
        </div>
        <AccountDropDown initiator={"mobile"} menuItems={menuItems} />
      </div>
    </>
  );
}
