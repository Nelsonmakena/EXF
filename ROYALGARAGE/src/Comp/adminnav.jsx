import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AdminNav({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="section flex flex-col gap-normal">
      {menuItems.map((item) => {
        const Icon = item.icon;

        // No submenu → normal navigation
        if (!item.subMenu?.length) {
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full h-15 flex items-center gap-7 px-4 ${
                path === item.path
                  ? "bg-card rounded-l-2xl tracking-widest"
                  : "font-bold bg-none text-header"
              }`}
            >
              <Icon />
              {item.name}
            </button>
          );
        }

        // Has submenu → dropdown
        return (
          <DropdownMenu key={item.name}>
            <DropdownMenuTrigger asChild>
              <button
                className={`w-full h-15 flex items-center gap-7 px-4 ${
                  path === item.path
                    ? "bg-card rounded-l-2xl tracking-widest"
                    : "font-bold bg-none text-header"
                }`}
              >
                <Icon />
                {item.name}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" className="w-52">
              {item.subMenu.map((subItem) => {
                const SubIcon = subItem.icon;

                return (
                  <DropdownMenuItem
                    className={"h-12 flex gap-5 px-4 hover:bg-secondary"}
                    key={subItem.path}
                    onClick={() => navigate(subItem.path)}
                  >
                    <SubIcon />
                    {subItem.name}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </div>
  );
}
