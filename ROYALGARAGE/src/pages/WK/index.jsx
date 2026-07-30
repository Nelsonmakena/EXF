import { Outlet } from "react-router";
import Wknav from "./wknav";

export default function WorkerTemplate() {
  return (
    <main className="w-full container-main">
      <div>
        <Wknav />
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
