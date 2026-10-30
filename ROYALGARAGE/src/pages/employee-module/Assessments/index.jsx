import CommonNav from "@/Comp/commonNav";
import { assessmentMenuItems } from "@/utils/menuitems";
import { Outlet } from "react-router";

export default function CarChecker() {
  return (
    <main>
      <div>
        <CommonNav menuItems={assessmentMenuItems} />
      </div>
      <div className="container-main">
        <Outlet />
      </div>
    </main>
  );
}
