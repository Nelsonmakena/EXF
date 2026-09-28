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
    parent: "admin/management",
    path: "/admin/management/workers",
    icon: LayoutDashboard,
    subMenu: [
      {
        name: "Workers",
        path: "management/workers",
        icon: Users,
      },
      {
        name: "Clients",
        path: "management/clients",
        icon: CircleUserRound,
      },
      {
        name: "Roles",
        path: "management/roles",
        icon: UserRoundKey,
      },
    ],
  },

  {
    name: "Inventory",

    parent: "admin/inventory",
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
    parent: "admin/tasks",
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

export const SystemMenuItems = [
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

export const employeeNavItems = [
  { name: "Jobs", path: "/w001/jobs" },
  { name: "Schedule", path: "/w001/schedule" },
  { name: "Messages", path: "/w001/messages" },
];
