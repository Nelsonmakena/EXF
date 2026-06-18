import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "/src/assets/logo.png";
import profileimage from "/src/assets/profile.png";
import { useContext, useState } from "react";
import { Globalcontext } from "../../../context";
import { LogOut } from "lucide-react";

export default function AdminNav() {
  const { SetIsloggedin, SetRole } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [Services, SetService] = useState(false);
  const [Workers, SetWorkers] = useState(false);
  const [Finance, SetFinance] = useState(false);
  const [Reports, SetReports] = useState(false);

  return (
    <div className={"flex flex-col  h-screen justify-between  w-full "}>
      <div className="flex  border">
        <nav className=" h-full flex items-center  ">
          <ul className="flex flex-col ">
            <li>
              <button>Dashbord</button>
            </li>
            <li>
              <button onClick={() => SetService(!Services)}>Services </button>

              {Services && (
                <ul>
                  <li>Manage services</li>
                  <li> Manage Products</li>
                </ul>
              )}
            </li>

            <li>Workers</li>
            <li>
              Finance
              <ul>
                <li>Payemnts</li>
                <li> Expenditure</li>
                <li> Revenue Reports</li>
              </ul>
            </li>
            <li>
              Reports
              <ul>
                <li>Analytics</li>
                <li>Performace reports</li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="  w-full h-24  bg-card rounded-xs ">
        <div className="">
          <img
            src={profileimage}
            alt="userimage"
            className="rounded-full w-14 h-14  "
          />
        </div>
      </div>
    </div>
  );
}
