import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  MapPin,
  UserRound,
  Wrench,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { clientJobInfo } from "@/Comp/store/jobsslice";

const job = {
  id: "1042",
  status: "In Progress",
  vehicle: {
    make: "Toyota",
    model: "Fielder",
    year: 2018,
    plate: "KDG 123A",
    mileage: "128,430 km",
  },
  appointment: "31 Aug 2026 · 10:00 AM",
  technician: "John Kamau",
  latestUpdate: {
    message: "Front brake pad replacement has started.",
    worker: "John Kamau",
    time: "12:14 PM",
  },
  services: [
    {
      name: "Engine Oil Change",
      status: "completed",
    },
    {
      name: "Brake Inspection",
      status: "completed",
    },
    {
      name: "Front Brake Pad Replacement",
      status: "in-progress",
    },
    {
      name: "Wheel Alignment",
      status: "pending",
    },
  ],
  activity: [
    {
      type: "update",
      title: "Repair started",
      description:
        "Front brake pad replacement has started. The old pads were heavily worn.",
      worker: "John Kamau",
      time: "12:14 PM",
      photos: 2,
      status: "current",
    },
    {
      type: "update",
      title: "Diagnosis completed",
      description:
        "Inspection completed. Found excessive wear on the front brake pads.",
      worker: "John Kamau",
      time: "10:45 AM",
      status: "completed",
    },
    {
      type: "status",
      title: "Vehicle inspected",
      description: "Initial inspection of the vehicle was completed.",
      time: "10:32 AM",
      status: "completed",
    },
    {
      type: "status",
      title: "Vehicle received",
      description: "Vehicle was received at the garage.",
      time: "10:01 AM",
      status: "completed",
    },
  ],
};

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
      <span className="h-2 w-2 rounded-full bg-blue-600" />
      {status}
    </span>
  );
}

function ActivityItem({ item, isLast }) {
  return (
    <div className="relative flex gap-4">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[15px] top-8 h-[calc(100%+16px)] w-px bg-gray-200" />
      )}

      {/* Timeline dot */}
      <div
        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          item.status === "current"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {item.status === "current" ? (
          <Wrench size={15} />
        ) : (
          <CheckCircle2 size={16} />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pb-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-semibold text-gray-900">{item.title}</h4>

          <span className="text-xs text-gray-500">{item.time}</span>
        </div>

        {item.worker && (
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <UserRound size={13} />
            {item.worker}
          </div>
        )}

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
          {item.description}
        </p>

        {item.photos && (
          <button className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50">
            <ImageIcon size={14} />
            {item.photos} photos
          </button>
        )}
      </div>
    </div>
  );
}

export default function ClientJobDetails() {
  const { job_id } = useParams();
  const dispatch = useDispatch();
  const { jobInformation } = useSelector((state) => state.jobs);

  const ProgressStep = ({ title, active, completed, last }) => {
    return (
      <div className="flex flex-1 items-start">
        <div className="flex flex-col items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              completed
                ? "bg-green-100 text-green-600"
                : active
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {completed ? (
              <CheckCircle2 size={17} />
            ) : active ? (
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-gray-300" />
            )}
          </div>

          <p
            className={`mt-2 text-center text-xs font-medium ${
              active || completed ? "text-gray-900" : "text-gray-400"
            }`}
          >
            {title}
          </p>
        </div>

        {!last && (
          <div
            className={`mt-4 h-0.5 flex-1 ${
              completed ? "bg-green-500" : "bg-gray-200"
            }`}
          />
        )}
      </div>
    );
  };

  const ServiceStatus = ({ status }) => {
    console.log(status);

    if (status === "completed") {
      return <CheckCircle2 size={20} className="text-green-600" />;
    }

    if (status === "in-progress" || "accepted") {
      return (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-blue-600">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
        </span>
      );
    }

    return <Circle size={20} className="text-gray-300" />;
  };
  useEffect(() => {
    dispatch(clientJobInfo(job_id));
  }, []);
  console.log(jobInformation);
  console.log(typeof jobInformation);
  if (!jobInformation) {
    return <h1>loading </h1>;
  }
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Job #{jobInformation?.job_id}
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              {jobInformation?.vehicle.brand} {jobInformation.vehicle.model}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {jobInformation?.vehicle.license_plate}
            </p>
          </div>

          <StatusBadge status={job.status} />
        </div>

        {/* Progress */}
        <section className="mb-6 rounded-2xl border border-accent bg-card p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Job Progress</h2>
              <p className="mt-1 text-xs text-gray-500">
                Current repair status
              </p>
            </div>

            <Clock3 size={19} className="text-gray-400" />
          </div>

          <div className="flex w-full">
            <ProgressStep title="Received" completed />

            <ProgressStep title="Inspection" completed />

            <ProgressStep title="Repair" active />

            <ProgressStep title="Quality Check" />

            <ProgressStep title="Ready" last />
          </div>
        </section>

        {/* Latest update */}
        <section className="mb-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Wrench size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Latest Update
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {job.latestUpdate.message}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                {job.latestUpdate.worker} · {job.latestUpdate.time}
              </p>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Vehicle */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Car size={20} className="text-gray-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">Vehicle</h2>
                  <p className="text-xs text-gray-500">Vehicle information</p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Car className="" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Vehicle</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {jobInformation.vehicle.model}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <FileText className="" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Registration</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {jobInformation.vehicle.license_plate}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Job details */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <FileText size={19} className="text-gray-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">Job Details</h2>
                  <p className="text-xs text-gray-500">
                    Appointment information
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Clock3 className="" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Appointment</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      {jobInformation.appointment_day}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <MapPin className="" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="mt-0.5 text-sm font-medium text-gray-900">
                      Royal Auto Garage
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="font-semibold text-gray-900">Services</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Services included in this job
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {jobInformation.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <ServiceStatus status={service.status} />

                      <span
                        className={`text-sm ${
                          service.status === "completed"
                            ? "text-gray-500 line-through"
                            : "font-medium text-gray-900"
                        }`}
                      >
                        {service.service_name}
                      </span>
                    </div>

                    {service.status === "in-progress" && (
                      <span className="text-xs font-medium text-blue-600">
                        In progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT - ACTIVITY */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-7">
              <h2 className="text-lg font-semibold text-gray-900">
                Job Activity
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Updates from the garage team
              </p>
            </div>

            <div>
              {/* {job.activity.map((item, index) => (
                <ActivityItem
                  key={`${item.title}-${item.time}`}
                  item={item}
                  isLast={index === job.activity.length - 1}
                />
              ))} */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
