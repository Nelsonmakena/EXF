import { Outlet } from "react-router";
import ClientNav from "./ClientNav";

export default function ClientIndex() {
  return (
    <>
      <div className="z-30">
        <ClientNav />
      </div>
      <div className="container-main">
        <Outlet />
      </div>
    </>
  );
}
