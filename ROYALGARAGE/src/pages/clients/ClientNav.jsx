import logo from "/src/assets/images/logo.png";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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
import {
  Menu,
  X,
  LogOut,
  ShoppingBag,
  MenuIcon,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { ModeToggle } from "@/Comp/mode-toggle";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/Comp/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { logoutAnyone } from "@/Comp/store/authslice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ClientNav() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { userinfo } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.services);

  const dispatch = useDispatch();

  const [SmallMe, SetSmallMe] = useState(false);
  const [ProfileMenu, SetProfileMenu] = useState(false);
  const navLinks = [
    { name: "Vehicles", Path: "vehicles" },
    { name: "Services ", Path: "services" },
    { name: "Shop", Path: "shop" },
    { name: "Appointments ", Path: "appointment" },
  ];
  const logout = () => {
    dispatch(logoutAnyone());
    navigate("/");
  };

  return (
    <>
      <div className="  flex items-center justify-center text-sm  w-full font-semibold h-24       ">
        <nav className=" flex items-center w-full relative h-20   bg-card rounded-2xl  md:w-5xl  shadow-md  ">
          {/* big screen menu  */}{" "}
          <div className="hidden md:flex w-full justify-between ">
            {/* icon logo */}
            <div
              className="flex items-center  card"
              onClick={() => {
                navigate("dashboard");
              }}
            >
              <img src={logo} alt="logo" className="h-16 w-16 " />
            </div>
            {/*menu  */}
            <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
              {navLinks.map((single) => {
                return (
                  <li className="card">
                    <Link to={single.Path}> {single.name} </Link>
                  </li>
                );
              })}
            </ul>
            <div className="  flex items-center  ">
              <Link to="cart">
                <div className="relative cursor-pointer">
                  <ShoppingBag />
                  <button
                    className={`absolute -top-2 -right-3 text-xs text-white w-4.5 h-4.5 rounded-full${cart.length === 0 ? "hidden" : " bg-accent"}`}
                  >
                    {cart.length}
                  </button>
                </div>
              </Link>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className=" flex items-center card cursor-pointer  rounded-full">
                  <h1 className="text-header-foreground">
                    {userinfo?.first_name[0]?.toUpperCase()}
                  </h1>
                  <h1 className="text-header">
                    {userinfo?.last_name[0]?.toUpperCase()}
                  </h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={
                  "w-2xs p-4.5 flex flex-col  gap-normal border-none   "
                }
              >
                <DropdownMenuItem
                  className={"flex"}
                  onClick={() => {
                    navigate("profile");
                  }}
                >
                  <User /> profile
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuGroup className="flex justify-between ">
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
                  className={"flex "}
                  variant="destructive"
                  onClick={() => {
                    logout();
                  }}
                >
                  <LogOut />
                  logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* small screen menu  */}
          <div className="flex   w-full  items-center justify-between container-main md:hidden ">
            <div
              onClick={() => {
                navigate("dashboard");
              }}
              className=" flex items-center cursor-pointer  h-14 "
            >
              <h1 className="text-orange-700  font-bold text-xl ">
                Royal <span className="text-blue-400">Auto </span>
                <span className="text-green-700 text-shadow-xs">
                  {" "}
                  Garage{" "}
                </span>{" "}
              </h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Menu className="w-10 h-10" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={"w-2xs flex flex-col  gap-normal mt-5 "}
              >
                <DropdownMenuItem className={"flex  "}>
                  <ul className=" ">
                    {navLinks.map((single) => {
                      return (
                        <li className="card">
                          <Link to={single.Path}> {single.name} </Link>
                        </li>
                      );
                    })}
                  </ul>
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuGroup className="flex justify-between px-2.5">
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
                  className={"flex "}
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
        </nav>
      </div>
    </>
  );
}
