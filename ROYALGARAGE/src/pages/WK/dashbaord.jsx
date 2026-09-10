import { useDispatch, useSelector } from "react-redux";
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
import { CarFront, ChevronRight, Clock3, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { acceptJob, assignedJobsList } from "@/Comp/store/jobsslice";
import { getWorkerDashboard } from "@/Comp/store/dashboardstarts";
import { formatDate } from "@/utils/utils";

export default function WorkerDashboard() {
  const { assignedJobs } = useSelector((state) => state.jobs);
  const { stats } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(assignedJobsList());
    dispatch(getWorkerDashboard());
  }, []);
  console.log(assignedJobs);

  return (
    <section className=" section-sm ">
      <div className="grid grid-cols-1 card md:grid-cols-3 gap-6 ">
        <div
          data-aos="fadeup"
          className=" bg-primary  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl flex  flex-col items-center"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="">Assigned</p>
          </div>
          <p className="text-3xl font-bold mb-2 transition-colors duration-200">
            {stats?.total_assigned}
          </p>
        </div>
        <div
          data-aos="fadeup"
          className="bg-secondary  rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 flex  flex-col items-center  hover:shadow-2xl"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="">In Progress</p>
          </div>
          <p className="text-3xl font-bold mb-2 transition-colors duration-200">
            {stats?.in_progress}
          </p>
        </div>
        <div
          data-aos="fadeup"
          className="bg-accent rounded-2xl p-6 text-white shadow-lg transition-colors duration-200 hover:shadow-2xl  flex flex-col items-center"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="">Completed</p>
          </div>
          <p className="text-3xl font-bold mb-2 transition-colors duration-200">
            {stats?.completed}
          </p>
        </div>
      </div>
      <div className="card">
        {assignedJobs.length == 0 ? (
          <div className="flex min-h-32 items-center justify-center rounded-xl border bg-card">
            <div className="text-center">
              <Wrench className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />

              <p className="text-sm font-medium">No jobs assigned</p>

              <p className="mt-1 text-xs text-muted-foreground">
                New assignments will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {assignedJobs.map((item) => (
              <div
                key={item.job_services_id}
                className="group flex min-h-20 items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                {/* VEHICLE ICON */}

                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary overflow-hidden sm:flex">
                  <img
                    src={`/assets/images/${item.service_image}.jpg`}
                    alt={item.service_name}
                    className="w-full h-full  "
                  />
                </div>

                {/* MAIN INFO */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-sm font-semibold">
                      {item.service_name}
                    </h2>
                    <h2 className="truncate text-[10px] ">assigned At </h2>
                    <div className="inline-flex  items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span>{formatDate(item.assignedAt)}</span>
                    </div>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {item.appointment_day}
                    </span>

                    <span className="flex items-center gap-1">
                      <Wrench className="h-3.5 w-3.5" />
                      Service #{item.jobServiceId}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(acceptJob(item.assignmentId))}
                  className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
