import { Outlet } from "react-router";
import logo from "/src/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./adminnav";
import { Menu } from "lucide-react";

import profileimage from "/src/assets/profile.png";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/Comp/mode-toggle";
export default function Admincommon() {
  const [hidemenu, Sethidemenu] = useState(false);
  return (
    <>
      <main className="flex ">
        <div
          className={` ${hidemenu == true ? "hidden  " : " min-h-svh md:w-64  shadow-md"} `}
        >
          <AdminNav />
        </div>

        <div className="flex flex-col w-full  ">
          <ScrollArea className="h-screen  ">
            <div className=" flex  py-2.5 justify-between h-20  w-full ">
              <div className="px-3.5">
                <Menu
                  onClick={() => Sethidemenu(!hidemenu)}
                  className="w-full h-10 text-primary"
                />
              </div>
            </div>
            <div className="container-main">
              <Outlet />
            </div>
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
