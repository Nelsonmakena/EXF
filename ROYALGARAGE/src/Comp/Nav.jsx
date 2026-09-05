import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "/src/assets/images/logo.png";
import Userlogin from "../pages/clients/Userlogin";

import logodata from "/src/assets/logoanimation.json";
import smallmenuanimation from "/src/assets/smallmenu.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { Search, Menu, Moon, Sun } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
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
import { useTheme } from "@/Comp/theme-provider";

function Nav() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();

  const commonNavLinks = [
    { name: "Home ", Path: "/" },
    { name: "Shop ", Path: "services" },
    { name: "blog ", Path: "blog" },
    { name: "About ", Path: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // scrolling DOWN
        setShowNav(false);
      } else {
        // scrolling UP
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between px-2.5   transition-transform duration-300 ${
          showNav
            ? "translate-y-0 bg-primary transition-all duration-300"
            : "-translate-y-full"
        }`}
      >
        <nav className=" hidden h-full md:flex items-center    ">
          <div className="w-18  ">
            <Lottie animationData={logodata} />
          </div>
          <div className="flex ">
            <ul className="flex space-x-3.5 ">
              {commonNavLinks.map((single, index) => {
                return (
                  <li key={index} className=" card ">
                    <Link to={single.Path}> {single.name} </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <Search />
        </nav>

        <div className=" hidden md:flex      h-full items-center ">
          <button
            onClick={() => navigate("/login")}
            className={`flex  justify-center items-center w-44  shadow-md  h-14 rounded-md
               ${showNav ? "bg-transparent " : " bg-white text-black"}`}
          >
            Get Started
          </button>
          <div className="card">
            <ModeToggle />
          </div>
        </div>

        {/* smallscreen menu  */}
        <div className="flex  w-full  items-center justify-between  md:hidden ">
          <div className=" ">
            {" "}
            <Lottie animationData={smallmenuanimation} />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Menu className="w-10 h-10" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={"w-2xs flex flex-col  gap-normal mt-5 "}
            >
              <ul className=" ">
                {commonNavLinks.map((single) => {
                  return (
                    <li className="card w-2xs">
                      <DropdownMenuItem
                        className={"flex  "}
                        onClick={() => {
                          navigate(single.Path);
                        }}
                      >
                        {single.name}
                      </DropdownMenuItem>
                    </li>
                  );
                })}
              </ul>

              <DropdownMenuSeparator></DropdownMenuSeparator>
              <DropdownMenuGroup className="flex justify-between px-4.5">
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

              <DropdownMenuItem className={"flex  justify-center"}>
                <Button
                  className={"w-43 h-10"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
export default Nav;
