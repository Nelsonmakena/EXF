import logo from "/src/assets/logo.png";

import profileimage from "/src/assets/profile.png";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Globalcontext } from "../../context";
import {
  Menu,
  X,
  LogOut,
  ShoppingBag,
  MenuIcon,
  Moon,
  Sun,
} from "lucide-react";
import { ModeToggle } from "@/Comp/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/comp/theme-provider";

export default function ClientNav() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { SetIsloggedin, SetRole } = useContext(Globalcontext);
  const [SmallMe, SetSmallMe] = useState(false);
  const [ProfileMenu, SetProfileMenu] = useState(false);
  const navlinks = [
    { name: "Vehicles", Path: "vehicles" },
    { name: "Services ", Path: "Userservice" },
    { name: "Appointments ", Path: "appointment" },
  ];
  useEffect(() => {
    if (SmallMe) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [SmallMe]);

  return (
    <>
      <div className="  flex items-center justify-center text-sm  w-full    font-semibold h-24       ">
        <nav className=" flex items-center w-full relative h-20   bg-card    rounded-2xl  md:w-3/4  shadow-md  ">
          {/* bigscreen menu  */}{" "}
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
              {navlinks.map((single) => {
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
                  <button className="absolute -top-2 -right-3 text-xs text-white bg-orange-600 w-4.5 h-4.5 rounded-full">
                    3
                  </button>
                </div>
              </Link>
            </div>
            <div
              className=" flex  items-center  card    "
              onClick={() => {
                SetProfileMenu(!ProfileMenu);
              }}
            >
              <img
                src={profileimage}
                alt="userimage"
                className="rounded-[50%] w-14 h-14"
              />
            </div>
            {ProfileMenu && (
              <div className=" absolute top-24 right-5 bg-card rounded-2xl shadow-md  w-2xs   card ">
                <div className="card text-body">
                  <button
                    onClick={() => {
                      navigate("profile");
                      SetProfileMenu(!ProfileMenu);
                    }}
                  >
                    {" "}
                    Profile{" "}
                  </button>
                </div>
                <div className=" card  flex  justify-between  ">
                  <div
                    className="px-3.5"
                    onClick={() => {
                      setTheme("dark");
                    }}
                  >
                    <Moon
                      className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
                    />
                  </div>
                  <div
                    className="px-3.5"
                    onClick={() => {
                      setTheme("light");
                    }}
                  >
                    <Sun
                      className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
                    />
                  </div>
                </div>

                <div className="card ">
                  <button
                    onClick={() => {
                      navigate("/");
                      SetIsloggedin(false);
                      SetRole(null);
                    }}
                  >
                    <LogOut className="text-blue-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* smallscreen menu  */}
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
            <button
              onClick={() => SetSmallMe(!SmallMe)}
              className="flex  items-center w-15 h-full  "
            >
              <Menu className="w-12 h-10" />
            </button>
          </div>
        </nav>
      </div>
      {SmallMe && (
        <div
          onClick={() => {
            SetSmallMe(!SmallMe);
          }}
          className="w-full h-screen  fixed top-0 backdrop-blur-xs z-999 "
        >
          <div className="  flex  flex-col bg-card    w-[50%] h-screen fixed right-0 z-10   gap-14 p-3.5   top-0">
            <div className="flex   items-center card-lg justify-end ">
              <button onClick={() => SetSmallMe(!SmallMe)} className="flex ">
                <Menu className="h-14 w-10 text-shadow-2xs" />
              </button>
            </div>

            <div className=" w-full">
              <ul className=" flex  flex-col text-2xl text-[#0c98ee]   space-y-8  font-semibold  ">
                {navlinks.map((single) => {
                  return (
                    <li
                      onClick={() => SetSmallMe(!SmallMe)}
                      className="card-lg"
                    >
                      <Link to={single.Path}> {single.name} </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className=" flex flex-row  card-lg ">
              <Link className="flex items-center gap-12" to="cart">
                <h1 className="text-2xl text-blue-400 font-bold"> Cart</h1>
              </Link>
              <div className="relative cursor-pointer">
                <button className="absolute -top-2 -right-3 text-xs text-white bg-orange-600 w-4.5 h-4.5 rounded-full">
                  3
                </button>
              </div>
            </div>
            <div className="  flex  justify-between card ">
              <div
                className="px-3.5"
                onClick={() => {
                  setTheme("dark");
                }}
              >
                <Moon
                  className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
                />
              </div>
              <div
                className="px-3.5"
                onClick={() => {
                  setTheme("light");
                }}
              >
                <Sun
                  className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
                />
              </div>
            </div>
            <div className="flex items-center  w-25  card-lg">
              {" "}
              <LogOut
                className="text-blue-400"
                onClick={() => {
                  navigate("/");
                  SetIsloggedin(false);
                  SetRole(null);
                }}
              />
            </div>

            <div className="flex flex-col w-full  fixed bottom-0   ">
              <div className="w-full border border-blue-400 "></div>
              <div className="flex w-full mt-4  items-center   ">
                <h1 className="text-2xl"> Profile </h1>

                <div className="flex  px-4">
                  <div className="  flex  items-center rounded-[50%] w-14 h-14 overflow-hidden shadow-md ">
                    <Link to="profile">
                      {" "}
                      <img src={profileimage} alt="userimage" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
