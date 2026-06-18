import AdminHome from "./adminhome";
import Adminlogin from "./Adminlogin";
import { Route, Routes, useLocation } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <main>
        <Adminlogin />
      </main>
    </>
  );
}
