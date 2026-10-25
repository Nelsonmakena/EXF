import { useLocation, useNavigate } from "react-router";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AdminNav({ menuItems, initiator, hideMenu }) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log(hideMenu);

  return (
    <div className="section flex flex-col gap-9 ">
      {menuItems.map((item) => {
        const Icon = item.icon;

        // No submenu → normal navigation
        if (!item.subMenu?.length) {
          return (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center  justify-center gap-7 px-4 ${
                path.includes(item.path)
                  ? !hideMenu
                    ? " h-15  bg-card rounded-l-2xl tracking-widest "
                    : "bg-card h-20"
                  : "font-bold bg-none"
              }`}
            >
              <div
                className={` h-full  w-full  gap-normal  ${hideMenu ? " flex flex-col text-xs items-center justify-center" : "flex"}`}
              >
                <Icon />
                {item.name}
              </div>
            </div>
          );
        }

        // Has submenu → dropdown
        return (
          <DropdownMenu key={item.name}>
            <DropdownMenuTrigger asChild>
              <div
                className={`flex items-center justify-center px-4  ${
                  path.includes(item.parent)
                    ? hideMenu
                      ? " h-20 bg-card "
                      : "bg-card h-15 rounded-l-2xl tracking-widest "
                    : "font-bold bg-none "
                }`}
              >
                <div
                  className={` h-full  w-full items-center gap-normal  ${hideMenu ? " flex flex-col text-xs items-center justify-center" : "flex"}`}
                >
                  <Icon />
                  {item.name}
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="start" className="w-52">
              {item.subMenu.map((subItem) => {
                const SubIcon = subItem.icon;

                return (
                  <DropdownMenuItem
                    className={`h-12 flex gap-5 px-4 ${initiator === "system" ? " hover:bg-primary hover:text-card " : "hover:bg-secondary"} `}
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
