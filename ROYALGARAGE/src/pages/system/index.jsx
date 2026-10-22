import AdminNav from "@/Comp/adminnav";
import { Outlet } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemMenuItems } from "@/utils/menuitems";
import SecondaryNav from "../ADMIN/pages/secondarynav";
import { useState } from "react";

export default function SystemIndex() {
  const [hideMenu, setHideMenu] = useState(true);
  return (
    <main className="flex  ">
      <div
        className={` bg-primary  ${hideMenu == true ? "w-20" : "min-h-svh md:w-64 rounded-tr-[40px]    "} `}
      >
        <AdminNav
          menuItems={SystemMenuItems}
          initiator={"system"}
          hideMenu={hideMenu}
        />
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
