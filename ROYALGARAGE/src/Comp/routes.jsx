import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";

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
import ProfileEdit from "../pages/clients/ProfileEdit";
import Cart from "../pages/clients/cart";
import Admincommon from "../pages/ADMIN/pages/admintemplate";
import AdminHome from "../pages/ADMIN/pages/adminhome";
import WkLogin from "../pages/WK/WkLogin";

import NotAuth from "./notauth";
import Authenticated from "./authenication/auth";

import AdminViewProducts from "@/pages/ADMIN/pages/Adminproducts";
import AdminViewServices from "@/pages/ADMIN/pages/Adminservices";
import Shop from "@/pages/clients/shop";
import WorkerView from "@/pages/ADMIN/pages/managment/workerview";
import jobList from "../pages/ADMIN/pages/joblist";
import JobList from "../pages/ADMIN/pages/joblist";
import WorkerTemplate from "@/pages/WK";
import WorkerDashborad from "@/pages/WK/dashbaord";
import RolesView from "@/pages/ADMIN/pages/managment/roles";

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
        <Route path="/notauthorized" element={<NotAuth />}></Route>

        {/* client  routes  */}
        <Route
          path="/client"
          element={
            <Authenticated>
              {" "}
              <Templatelayout />{" "}
            </Authenticated>
          }
        >
          <Route path="dashboard" element={<HomeClient />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="services" element={<ClientServices />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop" element={<Shop />} />
        </Route>

        {/* admin routes  */}

        <Route
          path="/admin"
          element={
            <Authenticated>
              {" "}
              <Admincommon />{" "}
            </Authenticated>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path="managment">
            <Route path="workers" element={<WorkerView />} />
            <Route path="roles" element={<RolesView />} />
          </Route>
          <Route path="inventory">
            <Route path="products" element={<AdminViewProducts />} />
            <Route path="services" element={<AdminViewServices />} />
          </Route>
          <Route path="tasks">
            <Route path="jobs" element={<JobList />} />
          </Route>
        </Route>
        {/* worker routes  */}

        <Route
          path="/w001"
          element={
            <Authenticated>
              {" "}
              <WorkerTemplate />
            </Authenticated>
          }
        >
          <Route path="dashboard" element={<WorkerDashborad />} />
        </Route>
      </Routes>
    </>
  );
}
