import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logo from "/src/assets/logo.png";
import Userlogin from "../pages/clients/Userlogin";
import { Globalcontext } from "../context";
import profileimage from "/src/assets/profile.png";
import logodata from "/src/assets/logoanimation.json";
import smallmenuanimation from "/src/assets/smallmenu.json";

import Lottie from "lottie-react";
import { Search, Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

function Nav() {
  const { Isloggedin, SetIsloggedin } = useContext(Globalcontext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [smallmenu, Setsmallmenu] = useState(false);
  const home = location.pathname === "/royalgarage/home";
  const services = location.pathname === "/services";

  const commonnavlinks = [
    { name: "Home ", Path: "/" },
    { name: "Shop ", Path: "services" },
    { name: "blog ", Path: "blog" },
    { name: "About ", Path: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 570) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (smallmenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [smallmenu]);

  return (
    <>
      <div
        className={` absolute top-0 left-0 z-50   flex items-center justify-between  h-24 w-full px-2.5 navbartext 
           ${
             scrolled
               ? "fixed bg-blue-400 text-black shadow-md"
               : home
                 ? "absolute bg-transparent text-white"
                 : "absolute bg-card shadow-md"
           }`}
      >
        <nav className=" hidden h-full md:flex items-center   ">
          <div className="w-18  ">
            <Lottie animationData={logodata} />
          </div>
          <div className="flex ">
            <ul className="flex space-x-3.5 ">
              {commonnavlinks.map((single, index) => {
                return (
                  <li key={index} className=" card">
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
               ${scrolled ? "bg-transparent " : " bg-white text-black"}`}
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
          <button
            onClick={() => Setsmallmenu(true)}
            className="flex  items-center w-15 h-full  "
          >
            <Menu className="w-12 h-10" />
          </button>
        </div>
      </div>

      {smallmenu == true ? (
        <div className="w-full h-screen  fixed top-0  bg-black/50 backdrop-blur-2xl z-50 navbartext ">
          <div className="  flex  flex-col  w-[50%] h-screen fixed right-0 z-10   gap-14 p-3.5   top-0">
            <div className="flex justify-end  h-16">
              <button onClick={() => Setsmallmenu(false)} className="flex ">
                <Menu className="h-14 w-10 text-shadow-2xs" />
              </button>
            </div>

            <div className=" w-full  h-full ">
              <ul
                onClick={() => Setsmallmenu(false)}
                className="flex flex-col  h-3/4 items-center     "
              >
                {commonnavlinks.map((single) => {
                  return (
                    <li className=" text-2xl card-lg    ">
                      <Link to={single.Path}> {single.name} </Link>
                    </li>
                  );
                })}
                <li className=" cursor-pointer text-2xl card-lg  ">
                  <Link to="/login"> </Link> login{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Nav;
