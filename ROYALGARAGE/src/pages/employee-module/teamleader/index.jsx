import CommonNav from "@/Comp/commonNav";
import { teamLeaderMenuItems } from "@/utils/menuitems";
import { Outlet } from "react-router";

export default function TeamLeaderIndex() {
  return (
    <main>
      {/* nav */}
      <div>
        <CommonNav menuItems={teamLeaderMenuItems} homePath={"/unit/home"} />
      </div>
      <div className="container-main">
        <Outlet />
      </div>
    </main>
  );
}
