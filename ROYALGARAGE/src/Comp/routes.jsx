import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Normal imports — small/common pages
import Userlogin from "../pages/clients/Userlogin";
import Pages404 from "./Pages404";
import Admin from "../pages/ADMIN/pages";
import WkLogin from "../pages/WK/WkLogin";
import NotAuth from "./notauth";
import NullComponent from "./../pages/null";
import Loader from "./loader";
import InventoryView from "@/pages/ADMIN/pages/catalog/inventoryView";

// Common
const Template = lazy(() => import("../pages/Common/Common"));
const Home = lazy(() => import("../pages/Common/Home"));
const About = lazy(() => import("../pages/Common/About"));
const Service = lazy(() => import("../pages/Common/Services"));

// Client
const HomeClient = lazy(() => import("../pages/clients/HomeClient"));
const Vehicles = lazy(() => import("../pages/clients/Vehicles"));
const Appointment = lazy(() => import("../pages/clients/appointments"));
const Feedback = lazy(() => import("../pages/clients/Feedback"));
const ClientServices = lazy(() => import("../pages/clients/ClientServices"));
const ProfileEdit = lazy(() => import("../pages/clients/ProfileEdit"));
const Cart = lazy(() => import("../pages/clients/cart"));
const Shop = lazy(() => import("../pages/clients/shop"));
const ClientJob = lazy(() => import("@/pages/clients/clientJob"));

// Admin
const AdminHome = lazy(() => import("../pages/ADMIN/pages/adminhome"));
const AdminViewProducts = lazy(
  () => import("@/pages/ADMIN/pages/Adminproducts"),
);
const AdminViewServices = lazy(
  () => import("@/pages/ADMIN/pages/Adminservices"),
);
const WorkerView = lazy(
  () => import("@/pages/ADMIN/pages/managment/workerview"),
);
const JobList = lazy(() => import("../pages/ADMIN/pages/joblist"));
const RolesView = lazy(() => import("@/pages/ADMIN/pages/managment/roles"));
const AdminJobCard = lazy(() => import("@/pages/ADMIN/pages/adminJobCard"));
const InprogressJobs = lazy(() => import("../pages/ADMIN/pages/inProgresJobs"));
const Messages = lazy(() => import("../pages/ADMIN/pages/messages"));
const SingleMessage = lazy(() => import("../pages/ADMIN/pages/singlemessage"));
const ClientsView = lazy(
  () => import("../pages/ADMIN/pages/managment/clientsview"),
);
const ClientInfoView = lazy(
  () => import("@/pages/ADMIN/pages/managment/clientinfoView"),
);

// Worker
const WorkerTemplate = lazy(() => import("@/pages/WK"));
const WkJobs = lazy(() => import("@/pages/WK/jobs"));
const WkMessages = lazy(() => import("@/pages/WK/messages"));
const WkJobCard = lazy(() => import("@/pages/WK/jobcard"));
const WkSchedule = lazy(() => import("@/pages/WK/schedule"));
const WorkerDashboard = lazy(() => import("@/pages/WK/dashbaord"));

// Authentication
const Authenticated = lazy(() => import("./authenication/auth"));

const ClientIndex = lazy(() => import("../pages/clients/clientIndex"));

const AdminIndex = lazy(() => import("../pages/ADMIN/pages/adminIndex"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/royal-garage/home" />} />

        {/* Common routes */}
        <Route path="/royal-garage" element={<Template />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Service />} />
        </Route>

        {/* Authentication / misc */}
        <Route path="/null" element={<NullComponent />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/admin-login" element={<Admin />} />
        <Route path="/wk" element={<WkLogin />} />
        <Route path="/not-authorized" element={<NotAuth />} />

        {/* Client routes */}
        <Route
          path="/client"
          element={
            <Authenticated>
              <ClientIndex />
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
          <Route path=":job_id" element={<ClientJob />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <Authenticated>
              <AdminIndex />
            </Authenticated>
          }
        >
          <Route path="home" element={<AdminHome />} />

          <Route path="management">
            <Route path="workers" element={<WorkerView />} />
            <Route path="clients" element={<ClientsView />} />
            <Route path="clients/:client_id" element={<ClientInfoView />} />
            <Route path="roles" element={<RolesView />} />
          </Route>

          <Route path="inventory">
            <Route path="products" element={<AdminViewProducts />} />
            <Route path="services" element={<AdminViewServices />} />
            <Route path="stock" element={<InventoryView />} />
          </Route>

          <Route path="messages" element={<Messages />}>
            <Route path="messages/:id" element={<SingleMessage />} />
          </Route>

          <Route path="tasks">
            <Route path="jobs" element={<JobList />} />
            <Route path="in-progress" element={<InprogressJobs />} />
            <Route path="jobs/:job_id" element={<AdminJobCard />} />
          </Route>
        </Route>

        {/* Worker routes */}
        <Route
          path="/w001"
          element={
            <Authenticated>
              <WorkerTemplate />
            </Authenticated>
          }
        >
          <Route path="dashboard" element={<WorkerDashboard />} />
          <Route path="schedule" element={<WkSchedule />} />
          <Route path="jobs" element={<WkJobs />} />
          <Route path="jobs/:jobId" element={<WkJobCard />} />
          <Route path="messages" element={<WkMessages />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Pages404 />} />
      </Routes>
    </Suspense>
  );
}
