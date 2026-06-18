import logo from "/src/assets/logo.png";
import x from "/src/assets/x.png";
import menu from "/src/assets/menu.png";
import me from "/src/assets/me.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Wknav() {
  const [SmallMe, SetSmallMe] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="  flex items-center justify-center text-sm  w-full   font-semibold h-20  overflow-hidden    ">
        <nav className=" w-full  md:w-3/4    relative h-17.5 flex items-center    text-black transition-all  shadow-md rounded-2xl  px-1.5">
          {/* bigscreen menu  */}{" "}
          <div className="hidden md:flex w-full justify-between">
            <div
              className="flex items-center"
              onClick={() => {
                navigate("/wk-hm");
              }}
            >
              <img src={logo} alt="logo" className="h-16 w-16 " />
            </div>

            <ul className="flex     text-xs text-green-700 items-center space-x-8 md:pl-28 md:text-xl">
              <li>
                <Link to="/dashboard"> Jobs </Link>
              </li>
              <li>
                <Link to="/Userservice"> Pending </Link>
              </li>

              <li>
                <Link to="/appointment "> Earnings </Link>
              </li>
            </ul>

            <div className="   rounded-[50%] w-14 h-14 overflow-hidden shadow-md ">
              <Link to="/profile">
                {" "}
                <img src={me} alt="userimage" />
              </Link>
            </div>
          </div>
          {/* smallscreen menu  */}
          <div className="flex h-full  w-full  items-center justify-between md:hidden px-3.5">
            <div
              onClick={() => {
                navigate("/wk-hm");
              }}
              className=""
            >
              <h1 className="text-orange-700  font-bold text-xl ">
                Royal <span className="text-blue-400">Auto </span>
                <span className="text-green-700 text-shadow-xs">
                  {" "}
                  Garage{" "}
                </span>{" "}
              </h1>
            </div>
            <button onClick={() => SetSmallMe(true)} className="flex ">
              <img src={menu} alt="logo" className="h-7 w-10" />
            </button>
          </div>
        </nav>
      </div>
      {SmallMe == true ? (
        <div className=" border flex  flex-col bg-white  w-[50%] h-screen absolute right-0 z-10  gap-14 p-3.5   top-0">
          <div>
            <button onClick={() => SetSmallMe(false)} className="flex ">
              <img src={x} alt="logo" className="h-7 w-7" />
            </button>
          </div>

          <div className=" w-full mt-10 ">
            <ul className=" flex  flex-col text-2xl text-[#0c98ee]   space-y-8  font-semibold  ">
              <li>
                <Link to="/dashboard"> Jobs </Link>
              </li>
              <li>
                <Link to="/Userservice"> Pending</Link>
              </li>
              <li>
                <Link to="/vehicles"> Earnings </Link>
              </li>
            </ul>
          </div>

          <div className="flex w-full justify-between">
            <h1 className="text-2xl"> Profile </h1>

            <div className="   rounded-[50%] w-14 h-14 overflow-hidden shadow-md ">
              <Link to="/profile">
                {" "}
                <img src={me} alt="userimage" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
