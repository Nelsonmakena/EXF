import { Outlet } from "react-router";
import Wknav from "./wknav";

export default function WorkerTemplate() {
  return (
    <main className="w-full container-main">
      <div>
        <Wknav />
      </div>
      <div className="mt-1.5">
        <Outlet />
      </div>
    </main>
  );
}
