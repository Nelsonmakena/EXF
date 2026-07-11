import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import axios from "axios";
import Skeletonloader from "../../Comp/loader";
export default function ProfileEdit() {
  const navigate = useNavigate();
  const [confirms, Setconfirms] = useState(false);
  const [clientInfo, SetclientInfo] = useState(null);

  const [isloading, Setisloading] = useState(true);
  //const firstletter = clientInfo.first_name;
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const info = await axios.get(
        "http://localhost:3000/api/client/profileinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      SetclientInfo(info.data);
      Setisloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  function Confirm() {
    Setconfirms(true);
    navigate("/dashboard");
  }

  useEffect(() => {
    getUserInfo();
  }, []);
  if (isloading) {
    return <Skeletonloader />;
  }

  return (
    <>
      <section className=" container-main  flex flex-col w-full   min-h-dvh items-center md:flex-row">
        <div className=" flex  flex-1 h-screen justify-center items-center   ">
          <div className="  rounded-[50%] w-72 h-72 overflow-hidden shadow-md flex items-center justify-center ">
            <h1 className="text-6xl text-header">
              {clientInfo.first_name.charAt(0)}
            </h1>
            <h1 className="text-6xl text-header-foreground">
              {clientInfo.second_name.charAt(0)}
            </h1>
          </div>
        </div>
        <div className=" section flex flex-col flex-1 h-screen  justify-center ">
          <div className="w-full flex justify-between">
            <h1 className="p-3.5 font-bold text-blue-400"> My profile </h1>
          </div>

          <div className=" flex-col  h-3/4 ">
            <form action="">
              <div className=" w-full flex flex-col   ">
                <label> email</label>
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="email"
                    defaultValue={clientInfo.email}
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>

              <div className=" w-full flex gap-2.5   ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="Text"
                    defaultValue={clientInfo.first_name}
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="Text"
                    defaultValue={clientInfo.last_name}
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>
              <div className=" w-full flex gap-2.5  ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="password"
                    placeholder="confirm Password"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>
              <div className=" w-full flex   ">
                <div className="flex items-center mt-6 w-1/2 bg-transparent border border-gray-300/60 h-12 rounded-md overflow-hidden pl-6 gap-2">
                  <input
                    type="text"
                    //  defaultValue={clientInfo.phonenumber}
                    placeholder="Phone number"
                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                    required
                  />
                </div>
              </div>

              <div className="w-full flex  justify-center">
                <button
                  onClick={Confirm}
                  type="submit"
                  className="mt-8 w-1/2 h-11 rounded-md text-white bg-blue-400 hover:opacity-90 transition-opacity"
                >
                  confrim
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
