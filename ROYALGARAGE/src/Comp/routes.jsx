import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Globalcontext } from "../context";
import Template from "../pages/Common/Common";
import Home from "../pages/Common/Home";
import About from "../pages/Common/About";
import Service from "../pages/Common/Services";
import Userlogin from "../pages/clients/Userlogin";
import Pages404 from "./Pages404";
import Admin from "../pages/ADMIN/pages";
import Templatelayout from "../pages/clients/templatelayout ";
import HomeClient from "../pages/clients/HomeClient";
import Vehicles from "../pages/clients/Vehicles";
import Appointment from "../pages/clients/appointments";
import Feedback from "../pages/clients/Feedback";
import ClientServices from "../pages/clients/ClientServices";
import ProfileEdit from "./ProfileEdit";
import Cart from "./cart";
import Admincommon from "../pages/ADMIN/pages/admintemplate";
import AdminHome from "../pages/ADMIN/pages/adminhome";
import Employees from "../pages/ADMIN/pages/Employess";
import WkLogin from "../pages/WK/WkLogin";
import WKhome from "../pages/WK/Wkhome";
import NotAuth from "./notauth";
import Authenicated from "./authenication/auth";
import { Ad } from "lucide-react";
import AdminViewProducts from "@/pages/ADMIN/pages/Adminproducts";
import AdminViewServices from "@/pages/ADMIN/pages/Adminservices";

export default function Routess() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/royalgarage/home" />} />

        {/**common */}
        <Route path="/royalgarage" element={<Template />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service />} />
        </Route>
        <Route path="/login" element={<Userlogin />} />
        <Route path="*" element={<Pages404 />}></Route>
        <Route path="/adminlogin" element={<Admin />} />
        <Route path="/wk" element={<WkLogin />}></Route>
        <Route path="/nt" element={<NotAuth />}></Route>

        {/* client  routes  */}
        <Route
          path="/client"
          element={
            <Authenicated>
              {" "}
              <Templatelayout />{" "}
            </Authenicated>
          }
        >
          <Route path="dashboard" element={<HomeClient />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="Userservice" element={<ClientServices />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* admin routes  */}

        <Route
          path="/admin"
          element={
            <Authenicated>
              {" "}
              <Admincommon />{" "}
            </Authenicated>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="employee" element={<Employees />} />
          <Route path="products" element={<AdminViewProducts />} />
          <Route path="services" element={<AdminViewServices />} />
        </Route>
        {/* worker routes  */}

        <Route
          path="/wk-hm"
          element={
            <Authenicated>
              {" "}
              <WKhome />
            </Authenicated>
          }
        ></Route>
      </Routes>
    </>
  );
}
