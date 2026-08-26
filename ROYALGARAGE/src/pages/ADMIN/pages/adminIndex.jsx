import { Outlet } from "react-router";
import logo from "/src/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "./adminnav";
import { Menu } from "lucide-react";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/Comp/mode-toggle";
import SecondaryNav from "./secondarynav";
export default function AdminIndex() {
  const [hidemenu, Sethidemenu] = useState(false);
  return (
    <>
      <main className="flex  bg-secondary">
        <div
          className={` ${hidemenu == true ? "hidden  " : " min-h-svh md:w-64 "} `}
        >
          <AdminNav />
        </div>

        <div
          className={`flex flex-col w-full bg-card overflow-hidden ${hidemenu ? "rounded-none " : "rounded-tl-[60px] rounded-bl-[30px]"} `}
        >
          <ScrollArea className="h-screen  ">
            <div className=" flex py-4 justify-between  h-20  w-full card ">
              <SecondaryNav hidemenu={hidemenu} Sethidemenu={Sethidemenu} />
            </div>
            <div className="container-main ">
              <Outlet />
            </div>
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
