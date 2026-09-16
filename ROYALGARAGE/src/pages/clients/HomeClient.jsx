import { CalendarDays, Car, Palette } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { total_No_Of_Vehicles } from "@/Comp/store/vehicleslice";
import Lottie from "lottie-react";
import buttonanimation from "/src/assets/addbuttondata.json";

import { useNavigate } from "react-router";
import { getClientJobs } from "@/Comp/store/jobsslice";

export default function HomeClient() {
  const { totalVehicle } = useSelector((state) => state.vehicle);
  const { clientJobs } = useSelector((state) => state.jobs);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(total_No_Of_Vehicles());
    dispatch(getClientJobs());
  }, []);
  console.log(clientJobs);

  return (
    <>
      <section className=" section p-3.5 w-full">
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
                navigate("/client/services");
              }}
              className="w-full h-12 text-white rounded-md   bg-primary"
            >
              New Service
            </button>
          </div>
          <div className="section-sm  ">
            <h1 className="  text-xl text-green-700 py-3 ">
              Ongoing <span className="text-blue-500"> Services </span>
            </h1>

            {/**service card  progress for ongoing services  */}
            <div className="grid md:grid-cols-3 gap-normal ">
              {clientJobs.map((item, index) => (
                <div
                  onClick={() => navigate(`/client/${item.job_id}`)}
                  key={index}
                  className="rounded-2xl border border-primary/20 bg-card p-5 shadow-sm "
                >
                  {/* Vehicle */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30">
                      <Car size={23} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold ">
                        {item.vehicle_model}
                      </h2>
                      <div className="flex items-center gap-normal text-sm">
                        <p className="font-medium text-gray-500 ">
                          {item.vehicle_brand}
                        </p>
                        <h1 className="tracking-widest">
                          {item.license_plate}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {/* Color */}
                    <div className="flex items-center gap-3">
                      <Palette size={18} className="text-accent" />
                      <div>
                        <p className="text-xs text-gray-500"> Color </p>
                        <p className="text-sm font-medium ">
                          {item.vehicle_color}
                        </p>
                      </div>
                    </div>
                    {/* Appointment */}
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Appointment</p>
                        <p className="text-sm font-medium ">
                          {item.appointment_day}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Status */}
                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-500"> Job Status </p>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-medium text-orange-700">
                      <span className="h-2 w-2 rounded-full bg-secondary" />
                      {item.job_current_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
