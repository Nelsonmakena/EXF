import { Outlet } from "react-router";
import Nav from "../../Comp/Nav";
import Footer from "../../Comp/footer";

export default function Template() {
  return (
    <>
      <div className=" container-main w-full">
        <Nav />
      </div>

      <Outlet />

      <Footer />
    </>
  );
}
