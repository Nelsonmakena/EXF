import CommonNav from "@/Comp/commonNav";
import { assessmentMenuItems } from "@/utils/menuitems";
import { Outlet } from "react-router";

export default function CarChecker() {
  return (
    <main>
      <div>
        <CommonNav
          menuItems={assessmentMenuItems}
          homePath={"/assessment/home"}
          initiator={"employee"}
        />
      </div>
      <div className="container-main">
        <Outlet />
      </div>
    </main>
  );
}
