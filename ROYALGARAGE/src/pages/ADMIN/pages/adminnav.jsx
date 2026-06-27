import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "/src/assets/logo.png";
import profileimage from "/src/assets/profile.png";
import { useContext, useState } from "react";
import { Globalcontext } from "../../../context";
import { LogOut, Moon, Sun } from "lucide-react";

{
  /* theme setter */
}
import { useTheme } from "@/comp/theme-provider";

export default function AdminNav() {
  const { setTheme, theme } = useTheme();
  const { SetIsloggedin, SetRole } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [Services, SetService] = useState(false);
  const [Workers, SetWorkers] = useState(false);
  const [Finance, SetFinance] = useState(false);
  const [Reports, SetReports] = useState(false);
  const [UserAccountSmallMenu, SetUserAccountSmallMenu] = useState(false);

  return (
    <div className="flex flex-col  h-screen justify-between  cursor-pointer  ">
      <div className=" h-3/4 section">
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
        <div className="p-1">
          <button className=" h-11 w-full bg-card"> Managment </button>
        </div>

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
      <div className="  h-24  bg-card rounded-xs ">
        <div
          className=" card "
          onClick={() => SetUserAccountSmallMenu(!UserAccountSmallMenu)}
        >
          <img
            src={profileimage}
            alt="userimage"
            className="rounded-full w-14 h-14  "
          />
        </div>
      </div>
      {/**pop up  small menu  */}
      {UserAccountSmallMenu && (
        <div className="bg-card   shadow-md absolute rounded-xl  w-3xs  bottom-5 left-52 z-999  ">
          <div className="  flex  justify-between shadow-md card ">
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
          <div className=" flex justify-center shadow-md card text-header ">
            Account settings
          </div>
          <div
            onClick={() => {
              navigate("/adminlogin");
              !UserAccountSmallMenu;
            }}
            className="  flex justify-center hadow-md card text-header"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
