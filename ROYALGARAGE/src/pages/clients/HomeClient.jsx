import ClientNav from "./ClientNav";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Skeletonloader from "../../Comp/loader";
import { useDispatch, useSelector } from "react-redux";
import { total_No_Of_Vehicles } from "@/Comp/store/vehicleslice";
import Lottie from "lottie-react";
import buttonanimation from "/src/assets/addbuttondata.json";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { getServiceList } from "@/Comp/store/serviceslice";

export default function HomeClient() {
  const { totalVehicle } = useSelector((state) => state.vehicle);
  const { ongoingServices } = useSelector((state) => state.services);
  console.log(totalVehicle);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(total_No_Of_Vehicles());
    dispatch(getServiceList());
  }, []);

  return (
    <>
      <section className=" mt-24 p-3.5 w-full container-main ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className=" bg-linear-to-br from-violet-500 to-purple-600  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Upcoming appointments
              </p>
            </div>

            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              2025-06-05
            </p>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              2025-06-05
            </p>
          </div>
          <div className="bg-linear-to-br from-blue-400 to-blue-600  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Recent Servivce
              </p>
            </div>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200">
              oil change
            </p>
          </div>
          <div className="bg-linear-to-br from-orange-700 to-orange-500 rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <p className="text-white/80 text-sm transition-colors duration-200">
                Total vehicles
              </p>
            </div>
            <p className="text-3xl font-bold mb-2 transition-colors duration-200  flex items-center justify-center">
              {totalVehicle}
            </p>
          </div>
        </div>
      </section>
      <section className="container-main ">
        <div className="section">
          {/* get new service */}
          <div className="bg-card w-46 card  rounded-xl shadow-md">
            <div className=" card ">
              <Lottie animationData={buttonanimation} />
            </div>
            <button
              onClick={() => {
                navigate("/client/Userservice");
              }}
              className="w-full h-12 text-white rounded-md   bg-primary"
            >
              {" "}
              New Service
            </button>
          </div>
          <div className=" section   ">
            <h1 className="  text-xl text-green-700 ">
              {" "}
              Ongoing <span className="text-blue-500"> Services </span>{" "}
            </h1>

            {/**service card  progress for ongoing services  */}
            <div className="flex flex-col gap-normal  justify-center items-center">
              {ongoingServices.length == 0 ? (
                <div className="w-full h-20 flex items-center justify-center">
                  {" "}
                  <Spinner> </Spinner>
                </div>
              ) : (
                ongoingServices.map((item) => {
                  return (
                    <div
                      key={item.job_id}
                      className="w-full  md:w-2xl card  md:flex rounded-2xl justify-between bg-primary shadow-md"
                    >
                      {/**col-1 */}
                      <div className="flex  md:flex-col justify-between card">
                        <h1 className=" text-primary-foreground">
                          Service name{" "}
                        </h1>
                        <h1>{item.service_name}</h1>
                      </div>

                      {/**col-2 */}
                      <div className="flex md:flex-col justify-between card">
                        <h1 className="text-primary-foreground"> progress </h1>
                        <h1> progress </h1>
                      </div>
                      {/**col-3 */}
                      <div className="flex md:flex-col justify-between card">
                        <h1 className="text-primary-foreground">Vehicle </h1>

                        <div className="flex  items-center gap-1.5">
                          <img
                            src=""
                            alt="Avatar"
                            class="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white sm:h-10 sm:w-10"
                          />

                          <h1> {item.liscence_plate}</h1>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
