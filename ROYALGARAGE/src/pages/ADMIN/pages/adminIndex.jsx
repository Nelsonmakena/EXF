import { Outlet, useLocation } from "react-router";
import logo from "/src/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AdminNav from "../../../Comp/adminnav";
import {} from "lucide-react";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import SecondaryNav from "./secondarynav";

import { AdminMenuItems } from "@/utils/menuitems";
export default function AdminIndex() {
  const [hideMenu, setHideMenu] = useState(false);

  return (
    <>
      <main className="flex border ">
        <div
          className={` ${hideMenu == true ? "hidden" : "min-h-svh md:w-64 bg-secondary rounded-tr-[40px]   "} `}
        >
          <AdminNav menuItems={AdminMenuItems} />
        </div>

        <div
          className={`flex flex-col w-full  overflow-hidden ${hideMenu ? "rounded-none " : "rounded-tl-[30px] rounded-bl-[30px]"} `}
        >
          <ScrollArea className="h-screen  ">
            <div className=" flex py-4 justify-between  h-20  w-full card ">
              <SecondaryNav hideMenu={hideMenu} setHideMenu={setHideMenu} />
            </div>
            <div className="container-main transition-opacity ">
              <Outlet />
            </div>
          </ScrollArea>
        </div>
      </main>
    </>
  );
}
