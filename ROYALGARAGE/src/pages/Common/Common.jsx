import { Outlet } from "react-router";
import Nav from "../../Comp/Nav";
import Footer from "../../Comp/footer";

export default function Template() {
  return (
    <>
      <div className="   w-full">
        <Nav />
      </div>

      <Outlet />

      <Footer />
    </>
  );
}
