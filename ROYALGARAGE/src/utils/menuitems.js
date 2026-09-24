import {
  LayoutDashboard,
  Users,
  CircleUserRound,
  UserRoundKey,
  ClipboardList,
} from "lucide-react";

export const AdminMenuItems = [
  {
    name: "Dashboard",
    path: "/admin/home",
    icon: LayoutDashboard,
  },
  {
    name: "Management",
    path: "management/workers",
    icon: LayoutDashboard,
    subMenu: [
      { name: "workers", path: "management/workers", icon: Users },
      { name: "clients", path: "management/clients", icon: CircleUserRound },
      { name: "roles", path: "management/roles", icon: UserRoundKey },
    ],
  },
  {
    name: "Inventory",
    path: "/admin/inventory",
    icon: ClipboardList,
    subMenu: [
      { name: "Products", path: "inventory/products", icon: Users },
      { name: "Services", path: "inventory/services", icon: CircleUserRound },
      { name: "Stock", path: "inventory/stock", icon: UserRoundKey },
    ],
  },
  {
    name: "Tasks",
    path: "tasks/jobs",
    icon: ClipboardList,
    subMenu: [
      { name: "Jobs", path: "tasks/jobs", icon: Users },
      { name: "InProgress", path: "tasks/in-progress", icon: CircleUserRound },
      { name: "Completed", path: "tasks/jobs", icon: UserRoundKey },
    ],
  },
];
