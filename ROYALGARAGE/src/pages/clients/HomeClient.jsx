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
import axios from "axios";
import Skeletonloader from "../../Comp/loader";
import { useDispatch, useSelector } from "react-redux";
import { total_No_Of_Vehicles } from "@/Comp/store/vehicleslice";
import Lottie from "lottie-react";
import buttonanimation from "/src/assets/addbuttondata.json";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { getServiceList } from "@/Comp/store/jobsslice";

export default function HomeClient() {
  const { totalVehicle } = useSelector((state) => state.vehicle);
  const { inProgress } = useSelector((state) => state.jobs);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(total_No_Of_Vehicles());
    dispatch(getServiceList());
  }, []);
  console.log(inProgress);

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
            <div className="w-full ">
              <Table className="">
                <TableCaption></TableCaption>

                <TableHeader>
                  <TableRow className="font-bold">
                    <TableHead
                      className={"font-bold text-secondary tracking-widest"}
                    >
                      Service
                    </TableHead>
                    <TableHead
                      className={"font-bold text-primary tracking-widest"}
                    >
                      Progress
                    </TableHead>
                    <TableHead
                      className={"font-bold text-secondary tracking-widest"}
                    >
                      vehicle
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {inProgress.map((item, index) => (
                  <TableRow
                    key={index}
                    className={"cursor-pointer"}
                    onClick={() => navigate(`/client/${item.job_services_id}`)}
                  >
                    <TableCell className={``}>
                      <div className="flex items-center gap-normal">
                        <div className="rounded-full w-12 h-12 overflow-hidden ">
                          <img
                            src={`/assets/images/${item.service_image}.jpg`}
                            alt={name}
                            className="rounded-full object-fill w-12 h-12"
                          />
                        </div>
                        <p>{item.service_name}</p>
                      </div>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>{item.license_plate}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
