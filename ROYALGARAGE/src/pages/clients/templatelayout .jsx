import { Outlet } from "react-router";
import ClientNav from "./ClientNav";

export default function Templatelayout() {
  return (
    <>
      <div>
        <ClientNav />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
