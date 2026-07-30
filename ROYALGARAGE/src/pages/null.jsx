// // // const response = await axios.post(...);
// // // if (response.data.success) {
// // //   setShowMessage(true);
// // // setTimeout(() => {
// // //     setShowMessage(false);
// // //     navigate("/client/dashboard");
// // //   }, 2000);
// // // }
// // // const [showPopup, setShowPopup] = useState(false);

// // // const openPopup = () => {
// // //   setShowPopup(true);
// // // setTimeout(() => {
// // //     setShowPopup(false);
// // //   }, 3000); // 3000ms = 3 seconds
// // // };
// // // Then:

// // // <button onClick={openPopup}>Open Popup</button>
// // // {showPopup && (
// // //   <div className="popup">
// // //     Product added successfully!
// // //   </div>
// // // )}
// // // <div className="flex w-full max-w-xs flex-col gap-2">
// // //       <Skeleton className="h-4 w-full" />
// // //       <Skeleton className="h-4 w-full" />
// // //       <Skeleton className="h-4 w-3/4" />
// // //     </div>

// // //  const getUserInfo = async () => {
// // //     try {
// // //       //user info
// // //       const response = await axios.get(
// // //         "http://localhost:3000/api/client/profileinfo",
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         },
// // //       );

// // //       Setclientinfo(response.data.data);
// // //     } catch (error) {
// // //       console.log(error.message);
// // //     }
// // //   };

// // //   import { createContext, useEffect, useState } from "react";
// // // import { jwtDecode } from "jwt-decode";
// // // import axios from "axios";

// // // export const Globalcontext = createContext(null);
// // // function Globalstate({ children }) {
// // //   const [Isloggedin, SetIsloggedin] = useState(null);
// // //   const [Role, SetRole] = useState(null);
// // //   const [authLoading, SetAuthLoading] = useState(true);
// // //   const [clientinfo, Setclientinfo] = useState([]);

// // //   const [cart, Setcart] = useState([]);

// // //   const token = localStorage.getItem("token");

// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     let decoded;

// // //     const time = Math.floor(Date.now() / 1000);

// // //     if (token) {
// // //       decoded = jwtDecode(token);
// // //       SetIsloggedin(true);
// // //       SetRole(decoded.role);
// // //       if (time > decoded.exp) {
// // //         SetIsloggedin(false);
// // //         localStorage.removeItem("token");
// // //       }
// // //     }
// // //     SetAuthLoading(false);
// // //   }, []);

// // //   return (
// // //     <Globalcontext.Provider
// // //       value={{
// // //         Isloggedin,
// // //         SetIsloggedin,
// // //         Role,
// // //         SetRole,
// // //         authLoading,
// // //         SetAuthLoading,
// // //         clientinfo,
// // //         Setclientinfo,

// // //         cart,
// // //         Setcart,
// // //       }}
// // //     >
// // //       {children}
// // //     </Globalcontext.Provider>
// // //   );
// // // }
// // // export default Globalstate;

// // // {UserAccountSmallMenu && (
// // //         <div className="bg-card   shadow-md absolute rounded-xl  w-3xs  bottom-5 left-52 z-999  ">
// // //           <div className="  flex  justify-between shadow-md card ">
// // //             <div
// // //               className="px-3.5"
// // //               onClick={() => {
// // //                 setTheme("dark");
// // //               }}
// // //             >
// // //               <Moon
// // //                 className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
// // //               />
// // //             </div>
// // //             <div
// // //               className="px-3.5"
// // //               onClick={() => {
// // //                 setTheme("light");
// // //               }}
// // //             >
// // //               <Sun
// // //                 className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className=" flex justify-center shadow-md card text-header ">
// // //             Account settings
// // //           </div>
// // //           <div
// // //             onClick={() => {
// // //               handleLogout();

// // //               !UserAccountSmallMenu;
// // //             }}
// // //             className="  flex justify-center hadow-md card text-header"
// // //           >
// // //             Logout
// // //           </div>
// // //         </div>
// // //       )}

// // // <div className="  h-24  bg-card rounded-xs ">
// // //         <div
// // //           className=" card "
// // //           onClick={() => SetUserAccountSmallMenu(!UserAccountSmallMenu)}
// // //         >
// // //           <img src="" alt="userimage" className="rounded-full w-14 h-14  " />
// // //         </div>
// // //       </div>

// // const App = () => {
// //   const [visible, setVisible] = React.useState(false);
// //   const [position, setPosition] = React.useState({ x: 0, y: 0 });
// //   const divRef = React.useRef(null);

// //   const handleMouseMove = (e) => {
// //     const bounds = divRef.current.getBoundingClientRect();
// //     setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
// //   };

// //   return (
// //     <div className="relative w-80 h-96 rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer">
// //       <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
// //         <img
// //           src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
// //           alt="Profile Avatar"
// //           className="w-24 h-24 rounded-full shadow-md my-4"
// //         />
// //         <h2 className="text-2xl font-bold text-gray-800 mb-1">
// //           Richard Nelson
// //         </h2>
// //         <p className="text-sm text-indigo-500 font-medium mb-4">
// //           Software Developer
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // <div className=" w-2xl h-40 bg-secondary font-bold flex justify-between card rounded-2xl shadow-xs cursor-pointer">
// //   {" "}
// //   <div className=" card  text-card">
// //     <h1>{item.first_name + item.last_name}</h1>
// //     <h1>{item.phonenumber}</h1>
// //     <h1>{item.email}</h1>
// //   </div>
// //   <div className="card text-card">
// //     <h1 className=" font-medium">{item.liscence_plate}</h1>
// //     <h1>{item.vehicle_brand}</h1>
// //   </div>
// //   <div className="card text-header font-bold">
// //     <h1 className="">{item.service_name}</h1>
// //   </div>
// // </div>;

// import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import logo from "/src/assets/images/logo.png";

// import { useContext, useState } from "react";

// import { LogOut, Moon, Sun } from "lucide-react";

// {
//   /* theme setter */
// }
// import { useTheme } from "@/comp/theme-provider";
// import { useDispatch } from "react-redux";
// import { logoutanyone } from "@/Comp/store/authslice";

// export default function AdminNav() {
//   const { setTheme, theme } = useTheme();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const path = location.pathname;

//   const navigate = useNavigate();
//   const [Services, SetService] = useState(false);
//   const [Managment, SetManagment] = useState(false);
//   const [Workers, SetWorkers] = useState(false);
//   const [Finance, SetFinance] = useState(false);
//   const [Reports, SetReports] = useState(false);
//   const [UserAccountSmallMenu, SetUserAccountSmallMenu] = useState(false);

//   const handleLogout = () => {
//     dispatch(logoutanyone()).then(navigate("/adminlogin"));
//   };
//   console.log(path);

//   return (
//     <div className="flex flex-col  h-screen justify-between  cursor-pointer bg-secondary  ">
//       <div className=" h-3/4 section">
//         {/** menu  dahsboard */}
//         <div className="pl-1.5">
//           <button
//             onClick={() => {
//               navigate("home");
//             }}
//             className={`${path === "/admin/home" ? "relative h-11 w-full bg-card rounded-l-2xl" : " font-bold bg-none text-card"} `}
//           >
//             {" "}
//             Dashboard{" "}
//           </button>
//         </div>
//         {/** menu  managnment  */}
//         <div className="p-1">
//           <button
//             onClick={() => {
//               SetManagment(!Managment);
//             }}
//             className={`${path === "/admin/workers" || "/admin/jobs " ? "relative h-11 w-full bg-card rounded-l-2xl" : " font-bold bg-none text-card"} `}
//           >
//             Managment
//           </button>
//           {Managment && (
//             <div className="  flex  flex-col  px-2.5 gap-1 transition  duration-300">
//               <button
//                 className="bg-card h-11  rounded-md "
//                 onClick={() => {
//                   navigate("workers");
//                 }}
//               >
//                 Workers
//               </button>
//               <button
//                 className="bg-card h-11 w-full rounded-md "
//                 onClick={() => {
//                   navigate("jobs");
//                 }}
//               >
//                 jobs
//               </button>
//             </div>
//           )}
//         </div>

//         {/** menu item 3  */}
//         <div
//           onClick={() => {
//             SetService(!Services);
//             console.log(Services);
//           }}
//           className="p-1 "
//         >
//           <button
//             className={`h-11 font-bold rounded-md shadow-md ${Services == true ? "bg-none w-1/2 text-header " : "w-full bg-card"}`}
//           >
//             Services{" "}
//           </button>
//         </div>
//         {Services && (
//           <div className="  flex  flex-col  px-2.5 gap-1 transition  duration-300">
//             <button
//               className="bg-card h-11  rounded-md "
//               onClick={() => {
//                 navigate("services");
//               }}
//             >
//               {" "}
//               Manage services{" "}
//             </button>
//             <button
//               className="bg-card h-11 w-full rounded-md "
//               onClick={() => {
//                 navigate("products");
//               }}
//             >
//               {" "}
//               Manage Products{" "}
//             </button>
//           </div>
//         )}

//         <div onClick={() => SetFinance(!Finance)} className="p-1">
//           <button
//             className={`h-11 w-full rounded-md ${Finance == true ? "bg-none " : "bg-card"}`}
//           >
//             Finance{" "}
//           </button>
//         </div>
//         {Finance && (
//           <div className=" flex  flex-col  px-2.5 gap-1">
//             <button className="bg-card h-11 w-full rounded-md ">
//               {" "}
//               Payements{" "}
//             </button>
//             <button className="bg-card h-11 w-full rounded-md ">
//               {" "}
//               Expenditure{" "}
//             </button>
//             <button className="bg-card h-11 w-full rounded-md ">
//               {" "}
//               Revenue Reports{" "}
//             </button>
//           </div>
//         )}

//         <div className="p-1 ">
//           <button
//             onClick={() => SetReports(!Reports)}
//             className={`h-11 w-full rounded-md ${Reports == true ? "bg-none " : "bg-card"}`}
//           >
//             Reports{" "}
//           </button>
//         </div>
//         {Reports && (
//           <div className=" flex  flex-col  px-2.5 gap-1">
//             <button className="bg-card h-11 w-full rounded-md ">
//               {" "}
//               Analytics{" "}
//             </button>
//             <button className="bg-card h-11 w-full rounded-md ">
//               {" "}
//               Performace reports{" "}
//             </button>
//           </div>
//         )}
//       </div>
//       {/**bottom section  */}
//       <div className="  h-24  rounded-xs flex items-center  px-3.5 shadow-md">
//         <div
//           className=" card bg-card flex items-center justify-center rounded-full w-20 h-20  shadow-xl"
//           onClick={() => SetUserAccountSmallMenu(!UserAccountSmallMenu)}
//         >
//           <h1 className="text-primary font-bold  ">admin</h1>
//         </div>
//       </div>
//       {/**pop up  small menu  */}
//       {UserAccountSmallMenu && (
//         <div className="bg-card   shadow-md absolute rounded-xl  w-3xs  bottom-5 left-52 z-999  ">
//           <div className="  flex  justify-between  card ">
//             <div
//               className="px-3.5"
//               onClick={() => {
//                 setTheme("dark");
//               }}
//             >
//               <Moon
//                 className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
//               />
//             </div>
//             <div
//               className="px-3.5"
//               onClick={() => {
//                 setTheme("light");
//               }}
//             >
//               <Sun
//                 className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
//               />
//             </div>
//           </div>
//           <div className=" flex justify-center card text-header ">
//             Account settings
//           </div>
//           <div
//             onClick={() => {
//               handleLogout();
//               !UserAccountSmallMenu;
//             }}
//             className="  flex justify-center  card text-header"
//           >
//             Logout
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

{
  ProfileMenu && (
    <div className=" fixed  top-24 right-5 bg-card rounded-2xl shadow-md  w-2xs   card  z-999">
      <div className="card  ">
        <button
          onClick={() => {
            //navigate("profile");
            SetProfileMenu(!ProfileMenu);
          }}
          className="flex  w-full h-full justify-between"
        >
          {" "}
          profile
          <User className="text-2xl" />
        </button>
      </div>
      <div className=" card  flex  justify-between  ">
        <div
          className="px-3.5"
          onClick={() => {
            setTheme("dark");
          }}
        >
          <Moon
            className={`  ${theme === "dark" ? "text-blue-400" : "text-black"}`}
          />
        </div>
        <div
          className="px-3.5"
          onClick={() => {
            setTheme("light");
          }}
        >
          <Sun
            className={`  ${theme === "light" ? "text-blue-400" : "text-black"}`}
          />
        </div>
      </div>

      <div className="card  ">
        <button
          onClick={() => {
            logout();
          }}
          className="flex  w-full justify-between"
        >
          logout
          <LogOut className="text-blue-400" />
        </button>
      </div>
    </div>
  );
}
