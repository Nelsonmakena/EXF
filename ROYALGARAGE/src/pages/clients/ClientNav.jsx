import CommonNav from "@/Comp/commonNav";
import { clientMenuItems } from "@/utils/menuitems";

export default function ClientNav() {
  return <CommonNav initiator={"client"} menuItems={clientMenuItems} />;
}
