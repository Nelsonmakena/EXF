import AdminNav from "@/Comp/adminnav";
import { Outlet } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemMenuItems } from "@/utils/menuitems";
import SecondaryNav from "../ADMIN/pages/secondarynav";
import { useState } from "react";

export default function SystemIndex() {
  const [hideMenu, setHideMenu] = useState(false);
  return (
    <main className="flex  ">
      <div
        className={` ${hideMenu == true ? "hidden" : "min-h-svh md:w-64 bg-primary rounded-tr-[40px]    "} `}
      >
        <AdminNav menuItems={SystemMenuItems} />
      </div>

      <div className={`flex flex-col w-full  overflow-hidden `}>
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
  );
}
