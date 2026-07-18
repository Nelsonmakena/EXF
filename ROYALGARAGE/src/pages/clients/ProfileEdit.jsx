import { useNavigate } from "react-router";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mail, Map, Phone } from "lucide-react";
import { Globalcontext } from "@/context";
import Loader from "@/Comp/loader";

export default function ProfileEdit() {
  // const { clientinfo, authLoading } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [clientinfo, Setclientinfo] = useState(null);
  const [isloading, Setisloading] = useState(true);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/client/profileinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Setclientinfo(response.data.data);
      console.log(response.status);
      console.log(response.data);

      Setisloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log(clientinfo);

  if (isloading) {
    return <Loader />;
  }

  return (
    <>
      <section className=" container-main  flex flex-col w-full   min-h-dvh items-center md:flex-row ">
        <div className=" flex  flex-1 h-screen justify-center items-center   ">
          <div className="  rounded-[50%] w-72 h-72 overflow-hidden shadow-md flex items-center justify-center ">
            <h1 className="text-6xl text-header">
              {clientinfo.first_name.charAt(0)}
            </h1>
            <h1 className="text-6xl text-header-foreground">
              {clientinfo.second_name.charAt(0)}
            </h1>
          </div>
        </div>
        <div className=" section flex flex-col flex-1 h-screen">
          <div className="w-full flex justify-center  card">
            <h1 className=" heading-normal font-bold text-blue-400">
              {" "}
              profile{" "}
            </h1>
          </div>

          <div className=" flex-col   ">
            <div className="shadow-md rounded-xl  card flex items-center justify-between">
              <h1 className="text-body ">{clientinfo.first_name}</h1>
              <h1 className="text-body">{clientinfo.second_name}</h1>
              <h1 className=" text-body">{clientinfo.last_name}</h1>
            </div>

            <div className="w-full h-1/2 flex justify-between">
              <div className="card shadow-md rounded-xl  flex flex-col items-center  justify-center w-1/2">
                <h1> {clientinfo.email}</h1>
                <Mail />
              </div>
              <div className="card flex flex-col justify-center items-center shadow-md rounded-xl w-1/2">
                <h1> {clientinfo.address}</h1>
                <Map />
              </div>
            </div>
            <div className="w-full h-1/2 flex justify-between">
              <div className="card shadow-md rounded-xl  flex flex-col items-center  justify-center w-1/2">
                <h1> {clientinfo.phonenumber}</h1>
                <Phone />
              </div>
            </div>
            <div className="flex justify-center card ">
              <button className="h-12 w-26  rounded-md bg-green-400 shadow-md transition duration-400  ">
                update{" "}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
