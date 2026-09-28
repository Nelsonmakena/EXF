import AdminNav from "@/Comp/adminnav";
import { Outlet } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SystemMenuItems } from "@/utils/menuitems";

export default function SystemIndex() {
  return (
    <section>
      <div className="w-2xs">
        <AdminNav menuItems={SystemMenuItems} />
      </div>
      <div>
        <ScrollArea className={"h-screen"}>
          <Outlet />
        </ScrollArea>
      </div>
    </section>
  );
}
