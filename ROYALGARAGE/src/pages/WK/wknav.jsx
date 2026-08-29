import logo from "/src/assets/images/logo.png";
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
import { Link, useNavigate } from "react-router-dom";
import { User, Moon, Sun, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAnyone } from "@/Comp/store/authslice";
import { useTheme } from "@/Comp/theme-provider";
export default function Wknav() {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const navLinks = [
    { name: "Jobs", Path: "jobs" },
    { name: "Schedule ", Path: "schedule" },
    { name: "Messages", Path: "messages" },
  ];

  const logout = () => {
    dispatch(logoutAnyone());
    navigate("/wk");
  };
  return (
    <>
      <div className="  flex items-center justify-center text-sm  w-full   font-semibold h-20  overflow-hidden     ">
        <nav className=" w-full  md:w-3/4    relative h-17.5 flex items-center    text-black transition-all  shadow-md rounded-2xl  px-1.5">
          {/* big-screen menu  */}{" "}
          <div className="hidden md:flex w-full justify-between">
            <div
              className="flex items-center"
              onClick={() => {
                navigate("dashboard");
              }}
            >
              <img src={logo} alt="logo" className="h-16 w-16 " />
            </div>
            <ul className="flex  items-center space-x-8 md:pl-28  navbartext ">
              {navLinks.map((single) => {
                return (
                  <li className="card">
                    <Link to={single.Path}> {single.name} </Link>
                  </li>
                );
              })}
            </ul>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className=" flex items-center card cursor-pointer  rounded-full">
                  {/* <h1 className="text-header-foreground">
                    {userinfo?.first_name[0]?.toUpperCase()}
                  </h1>
                  <h1 className="text-header">
                    {userinfo?.last_name[0]?.toUpperCase()}
                  </h1> */}
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
          {/* smallscreen menu  */}
          <div className="flex h-full  w-full  items-center justify-between md:hidden px-3.5">
            <div
              onClick={() => {
                navigate("/wk-hm");
              }}
              className=""
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
