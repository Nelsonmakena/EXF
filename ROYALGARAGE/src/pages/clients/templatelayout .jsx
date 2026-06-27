import { Outlet } from "react-router";
import ClientNav from "./ClientNav";

export default function Templatelayout() {
  return (
    <>
      <div className="z-30">
        <ClientNav />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
