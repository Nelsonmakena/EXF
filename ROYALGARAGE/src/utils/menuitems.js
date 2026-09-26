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
    path: "/admin/management/workers",
    icon: LayoutDashboard,
    subMenu: [
      {
        name: "Workers",
        path: "/admin/management/workers",
        icon: Users,
      },
      {
        name: "Clients",
        path: "/admin/management/clients",
        icon: CircleUserRound,
      },
      {
        name: "Roles",
        path: "/admin/management/roles",
        icon: UserRoundKey,
      },
    ],
  },

  {
    name: "Inventory",
    path: "/admin/inventory/products",
    icon: ClipboardList,
    subMenu: [
      {
        name: "Products",
        path: "/admin/inventory/products",
        icon: Users,
      },
      {
        name: "Services",
        path: "/admin/inventory/services",
        icon: CircleUserRound,
      },
      {
        name: "Stock",
        path: "/admin/inventory/stock",
        icon: UserRoundKey,
      },
    ],
  },

  {
    name: "Tasks",
    path: "/admin/tasks/jobs",
    icon: ClipboardList,
    subMenu: [
      {
        name: "Jobs",
        path: "/admin/tasks/jobs",
        icon: Users,
      },
      {
        name: "In Progress",
        path: "/admin/tasks/in-progress",
        icon: CircleUserRound,
      },
      {
        name: "Completed",
        path: "/admin/tasks/completed",
        icon: UserRoundKey,
      },
    ],
  },
];
