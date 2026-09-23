import AdminNav from "@/Comp/adminnav";
import { Outlet } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SystemIndex() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/home",
      icon: LayoutDashboard,
      subMenu: [
        { name: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
      ],
    },
    {
      name: "Accounts",
      path: "/admin/home",
      icon: LayoutDashboard,
      subMenu: [
        { name: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
      ],
    },
    {
      name: "Roles",
      path: "/admin/home",
      icon: LayoutDashboard,
      subMenu: [
        { name: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
      ],
    },
    {
      name: "Audit Logs",
      path: "/admin/home",
      icon: LayoutDashboard,
      subMenu: [
        { name: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
      ],
    },
    {
      name: "System Settings",
      path: "/admin/home",
      icon: LayoutDashboard,
      subMenu: [
        { name: "Dashboard", path: "/admin/home", icon: LayoutDashboard },
      ],
    },
  ];
  return (
    <section>
      <div className="w-2xs">
        <AdminNav menuItems={menuItems} />
      </div>
      <div>
        <ScrollArea className={"h-screen"}>
          <Outlet />
        </ScrollArea>
      </div>
    </section>
  );
}
