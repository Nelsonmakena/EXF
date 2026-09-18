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
import { acceptJob, assignedJobsList } from "@/store/jobsslice";
import { getWorkerDashboard } from "@/store/dashboardstarts";
import { formatDate } from "@/utils/utils";
import EmployeeJobCard from "./employeeJobCard";
import StatCard from "@/Comp/statCard";

export default function WorkerDashboard() {
  const { assignedJobs } = useSelector((state) => state.jobs);
  const { stats } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(assignedJobsList());
    dispatch(getWorkerDashboard());
  }, []);
  console.log(stats);

  return (
    <section className=" section-sm ">
      <div className="grid grid-cols-1 card md:grid-cols-3 gap-6 ">
        <StatCard />
      </div>
      <div className="section-sm">
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
            {assignedJobs.map((item, index) => (
              <EmployeeJobCard item={item} key={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
