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
import { getNonUnassigned } from "@/Comp/store/wokerslice";
import { toast } from "sonner";
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
  const { jobInformation } = useSelector((state) => state.jobs);
  const { noWork } = useSelector((state) => state.worker);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { job_id } = useParams();

  useEffect(() => {
    dispatch(jobInfo());
  }, []);

  return (
    <section className="section-sm rounded-2xl border border-gray-200 bg-card shadow-sm">
      <div className="border-b border-gray-100 p-5">
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

      <div className="space-y-5 p-5">
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
    </section>
  );
}
