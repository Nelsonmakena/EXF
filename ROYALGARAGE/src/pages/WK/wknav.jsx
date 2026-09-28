import CommonNav from "@/Comp/commonNav";
import { employeeNavItems } from "@/utils/menuitems";
export default function Wknav() {
  return (
    <CommonNav menuItems={employeeNavItems} homePath={"/w001/dashboard"} />
  );
}
