import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo.png";

import { useContext, useState } from "react";

import { LogOut, Moon, Sun } from "lucide-react";

{
  /* theme setter */
}
import { useTheme } from "@/comp/theme-provider";
import { useDispatch } from "react-redux";
import { logoutanyone } from "@/Comp/store/authslice";

export default function AdminNav() {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [Services, SetService] = useState(false);
  const [Managment, SetManagment] = useState(false);
  const [Workers, SetWorkers] = useState(false);
  const [Finance, SetFinance] = useState(false);
  const [Reports, SetReports] = useState(false);
  const [UserAccountSmallMenu, SetUserAccountSmallMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logoutanyone()).then(navigate("/adminlogin"));
  };

  return (
    <div className="flex flex-col  h-screen justify-between  cursor-pointer  ">
      <div className=" h-3/4 section">
        {/** menu item 1  */}
        <div className="p-1">
          <button
            onClick={() => {
              navigate("home");
            }}
            className=" h-11 w-full bg-card"
          >
            {" "}
            Dashboard{" "}
          </button>
        </div>
        {/** menu item 2  */}
        <div className="p-1">
          <button
            onClick={() => {
              SetManagment(!Managment);
            }}
            className=" h-11 w-full bg-card"
          >
            {" "}
            Managment{" "}
          </button>
          {Managment && (
            <div className="  flex  flex-col  px-2.5 gap-1 transition  duration-300">
              <button
                className="bg-card h-11  rounded-md "
                onClick={() => {
                  navigate("workers");
                }}
              >
                Workers
              </button>
              <button
                className="bg-card h-11 w-full rounded-md "
                onClick={() => {
                  navigate("jobs");
                }}
              >
                jobs
              </button>
            </div>
          )}
        </div>

        {/** menu item 3  */}
        <div
          onClick={() => {
            SetService(!Services);
            console.log(Services);
          }}
          className="p-1 "
        >
          <button
            className={`h-11 font-bold rounded-md shadow-md ${Services == true ? "bg-none w-1/2 text-header " : "w-full bg-card"}`}
          >
            Services{" "}
          </button>
        </div>
        {Services && (
          <div className="  flex  flex-col  px-2.5 gap-1 transition  duration-300">
            <button
              className="bg-card h-11  rounded-md "
              onClick={() => {
                navigate("services");
              }}
            >
              {" "}
              Manage services{" "}
            </button>
            <button
              className="bg-card h-11 w-full rounded-md "
              onClick={() => {
                navigate("products");
              }}
            >
              {" "}
              Manage Products{" "}
            </button>
          </div>
        )}

        <div onClick={() => SetFinance(!Finance)} className="p-1">
          <button
            className={`h-11 w-full rounded-md ${Finance == true ? "bg-none " : "bg-card"}`}
          >
            Finance{" "}
          </button>
        </div>
        {Finance && (
          <div className=" flex  flex-col  px-2.5 gap-1">
            <button className="bg-card h-11 w-full rounded-md ">
              {" "}
              Payements{" "}
            </button>
            <button className="bg-card h-11 w-full rounded-md ">
              {" "}
              Expenditure{" "}
            </button>
            <button className="bg-card h-11 w-full rounded-md ">
              {" "}
              Revenue Reports{" "}
            </button>
          </div>
        )}

        <div className="p-1 ">
          <button
            onClick={() => SetReports(!Reports)}
            className={`h-11 w-full rounded-md ${Reports == true ? "bg-none " : "bg-card"}`}
          >
            Reports{" "}
          </button>
        </div>
        {Reports && (
          <div className=" flex  flex-col  px-2.5 gap-1">
            <button className="bg-card h-11 w-full rounded-md ">
              {" "}
              Analytics{" "}
            </button>
            <button className="bg-card h-11 w-full rounded-md ">
              {" "}
              Performace reports{" "}
            </button>
          </div>
        )}
      </div>
      {/**bottom section  */}
      <div className="  h-24  rounded-xs flex items-center  px-3.5 shadow-md">
        <div
          className=" card bg-card flex items-center justify-center rounded-full w-20 h-20  shadow-xl"
          onClick={() => SetUserAccountSmallMenu(!UserAccountSmallMenu)}
        >
          <h1 className="text-primary font-bold  ">admin</h1>
        </div>
      </div>
      {/**pop up  small menu  */}
      {UserAccountSmallMenu && (
        <div className="bg-card   shadow-md absolute rounded-xl  w-3xs  bottom-5 left-52 z-999  ">
          <div className="  flex  justify-between  card ">
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
          <div className=" flex justify-center card text-header ">
            Account settings
          </div>
          <div
            onClick={() => {
              handleLogout();
              !UserAccountSmallMenu;
            }}
            className="  flex justify-center  card text-header"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
