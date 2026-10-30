import { Menu } from "lucide-react";

import AccountDropDown from "@/Comp/accountdropdown";
import { useLocation } from "react-router";
export default function SecondaryNav({ hideMenu, setHideMenu, item }) {
  const { pathname } = useLocation();

  const getCurrentMenu = (items, pathname) => {
    const allItems = items.flatMap((item) => [item, ...(item.subMenu || [])]);
    console.log(allItems);

    return allItems.find((item) => item.path === pathname);
  };
  const currentMenu = getCurrentMenu(item, pathname);

  return (
    <section className=" w-full flex items-center  ">
      <div className=" shadow-md flex items-center justify-between w-full rounded-2xl p-2 ">
        <div className="px-6">
          <Menu
            onClick={() => setHideMenu(!hideMenu)}
            className="w-full text-primary"
          />
        </div>
        <div className="flex ">
          <h1 className="font-bold text-header tracking-widest">
            {" "}
            {currentMenu?.name}{" "}
          </h1>
        </div>
        <AccountDropDown />
      </div>
    </section>
  );
}
