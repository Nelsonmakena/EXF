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
import { Link, useNavigate } from "react-router";
import { AvatarFormatter } from "@/utils/utils";

export default function AccountDropDown({ initiator, menuItems, user }) {
  const { userinfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutAnyone());
    navigate("/");
  };

  const navigateUser = (user) => {
    switch (user) {
      case "client":
        navigate("/client/profile");
        break;
      case "admin":
        navigate();
        break;
      case "employee":
        navigate();
        break;

      default:
        console.log("Unknown action");
    }
  };
  if (initiator === "mobile") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="w-10 h-10" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={"w-2xs flex flex-col  gap-normal mt-5 p-0 "}
        >
          <DropdownMenuItem
            onClick={() => navigateUser(user)}
            className={
              "flex justify-between px-3 bg-primary h-14 rounded-b-none tracking-widest"
            }
          >
            {" "}
            <User2Icon /> Profile
          </DropdownMenuItem>
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
        <div className="w-10 h-10  flex items-center justify-center  cursor-pointer  rounded-full border border-primary/20">
          <h1 className="text-header-foreground">
            {AvatarFormatter(userinfo.first_name, "U")}
          </h1>
          <h1 className="text-header">
            {AvatarFormatter(userinfo.last_name, "U")}
          </h1>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={"w-2xs shadow-none p-0  flex flex-col  gap-normal  "}
      >
        <DropdownMenuItem
          onClick={() => navigateUser(user)}
          className={
            "flex justify-between px-3 bg-primary h-14 rounded-b-none tracking-widest"
          }
        >
          {" "}
          <User2Icon /> Profile
        </DropdownMenuItem>

        <DropdownMenuGroup className="flex justify-between px-3">
          <DropdownMenuItem
            className="px-0"
            onClick={() => {
              setTheme("dark");
            }}
          >
            <Moon
              className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
            />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-0"
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
            "flex justify-between font-bold bg-destructive/20 px-3 h-14 rounded-t-none"
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
