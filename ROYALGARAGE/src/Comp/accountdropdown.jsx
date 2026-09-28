import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/Comp/theme-provider";

import { Menu, LogOut, Moon, Sun, User, User2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAnyone } from "@/store/authslice";
import { Link } from "react-router";

export default function AccountDropDown({ initiator, menuItems }) {
  const { userinfo } = useSelector((state) => state.auth);
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAnyone());
    navigate("/");
  };
  if (initiator === "mobile") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="w-10 h-10" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={"w-2xs flex flex-col  gap-normal mt-5 "}
        >
          <DropdownMenuItem className={"flex  "}>
            <ul className=" ">
              {menuItems.map((menu) => {
                return (
                  <li className="card">
                    <Link to={menu.path}> {menu.name} </Link>
                  </li>
                );
              })}
            </ul>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuGroup className="flex justify-between px-2.5">
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark");
              }}
            >
              <Moon
                className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("light");
              }}
            >
              <Sun
                className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem
            className={"flex "}
            variant="destructive"
            onClick={() => {
              logout();
            }}
          >
            logout
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {userinfo.first_name && userinfo.last_name ? (
          <div className="w-10 h-10  flex items-center justify-center  cursor-pointer  rounded-full border border-primary/20">
            <h1 className="text-header-foreground">
              {userinfo?.first_name[0]?.toUpperCase()}
            </h1>
            <h1 className="text-header">
              {userinfo?.last_name[0]?.toUpperCase()}
            </h1>
          </div>
        ) : (
          <div className="w-10 h-10  flex items-center justify-center  cursor-pointer  rounded-full border border-primary/20">
            <h1>Ee</h1>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"w-2xs shadow-none p-0  flex flex-col  gap-normal  "}
      >
        <DropdownMenuItem
          className={
            "flex justify-between px-3 bg-primary/50 h-12 rounded-b-none tracking-widest"
          }
        >
          {" "}
          <User2Icon /> Profile
        </DropdownMenuItem>

        <DropdownMenuGroup className="flex justify-between ">
          <DropdownMenuItem
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon
              className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTheme("light");
            }}
          >
            <Sun
              className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem
          className={
            "flex justify-between font-bold bg-destructive/20 px-3 h-12 rounded-t-none"
          }
          variant="destructive"
          onClick={() => {
            logout();
          }}
        >
          logout
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
