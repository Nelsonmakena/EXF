import {
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  Search,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AssignJob, jobInfo } from "@/Comp/store/jobsslice";
import { getNonUnassigned, getWorkerList } from "@/Comp/store/wokerslice";
import { toast } from "sonner";
import EmployeeCard from "./managment/employeeCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminJobCard() {
  const jobData = {
    id: "1042",
    status: "Awaiting Assignment",
    appointment: "31 Aug 2026 · 10:00 AM",
    customer: "Nelson Ndolo",

    vehicle: {
      make: "Toyota",
      model: "Fielder",
      year: 2018,
      plate: "KDG 123A",
      mileage: "128,430 km",
    },

    services: [
      "Brake Inspection",
      "Front Brake Pad Replacement",
      "Wheel Alignment",
    ],
  };
  const { workerList } = useSelector((state) => state.worker);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { job_id } = useParams();

  useEffect(() => {
    if (workerList.length == 0) {
      dispatch(getWorkerList());
    }
    dispatch(jobInfo());
  }, []);

  return (
    <section className="section-sm grid gap-6 xl:grid-cols-[0.85fr_1fr_1fr] h-screen ">
      <div className="rounded-2xl border border-gray-200 bg-card shadow-sm card">
        <div className="border-b border-gray-100 p-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <Wrench size={19} className="text-gray-700" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Job #{jobData.id}</p>

              <h2 className="font-semibold text-gray-900">Job Details</h2>
            </div>
          </div>
        </div>

        <div className="space-y-5 ">
          {/* Status */}
          <div>
            <p className="text-xs text-gray-500">Status</p>

            <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {jobData.status}
            </span>
          </div>

          {/* Vehicle */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Vehicle
            </p>

            <div className="rounded-xl bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <Car size={20} className="text-gray-600" />

                <div>
                  <p className="font-semibold text-gray-900">
                    {jobData.vehicle.make} {jobData.vehicle.model}
                  </p>

                  <p className="text-xs text-gray-500">
                    {jobData.vehicle.year} · {jobData.vehicle.plate}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-between border-t border-gray-200 pt-3">
                <span className="text-xs text-gray-500">Mileage</span>

                <span className="text-xs font-medium text-gray-900">
                  {jobData.vehicle.mileage}
                </span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <UserRound size={17} className="text-gray-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Customer</p>

              <p className="text-sm font-medium text-gray-900">
                {jobData.customer}
              </p>
            </div>
          </div>

          {/* Appointment */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
              <CalendarDays size={17} className="text-gray-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Appointment</p>

              <p className="text-sm font-medium text-gray-900">
                {jobData.appointment}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Services
            </p>

            <div className="space-y-2">
              {jobData.services.map((service) => (
                <div
                  key={service}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-card shadow-sm card ">
        <div>
          <div className="flex items-start justify-between ">
            <div>
              <h2 className="font-semibold text-gray-900">
                Available Employees
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Employees currently without a job
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
              available {workerList.jobs}
            </span>
          </div>
          <div className="relative mt-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>
        <ScrollArea className="h-screen no-scrollbar ">
          <div className="mt-2.5 grid gap-normal">
            {workerList
              .filter((worker) => worker.jobs.length == 0)
              .map((item, index) => (
                <EmployeeCard key={index} employee={item} />
              ))}
          </div>
        </ScrollArea>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-card shadow-sm card ">
        <div className="flex items-start justify-between ">
          <div>
            <h2 className="font-semibold text-gray-900">All Employees</h2>

            <p className="mt-1 text-xs text-gray-500">Everyone in the garage</p>
          </div>

          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
            {workerList.length}
            available
          </span>
        </div>
        <ScrollArea className="h-screen ">
          <div className="mt-2.5 grid gap-normal">
            {workerList.map((item, index) => (
              <EmployeeCard key={index} employee={item} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
