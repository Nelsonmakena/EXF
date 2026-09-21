import { useState } from "react";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { AssignJob, jobInfo } from "@/store/jobsslice";
import { toast } from "sonner";
import { getWorkerList } from "@/store/wokerslice";
import { Spinner } from "@/components/ui/spinner";

export default function EmployeeCard({
  employee,
  jobServiceId,
  job_id,
  canAssign,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAvailable = !employee.jobs.length;

  const assignJob = async () => {
    if (!jobServiceId) {
      return toast.error("Please select a service first");
    }
    setLoading(true);
    dispatch(
      AssignJob({
        job_services_id: jobServiceId,
        employee_id: employee.employee_id,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setLoading(false);
        dispatch(getWorkerList());
        dispatch(jobInfo(job_id));
        toast(data?.payload?.message);
      } else {
        setLoading(false);
        toast.error(data?.payload?.message);
      }
    });
  };

  return (
    <div
      className={`rounded-xl border p-4 transition cursor-pointer ${
        isAvailable
          ? "border-accent/20 bg-card hover:border-accent"
          : "border-primary/20 bg-card hover:border-primary"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50 text-sm font-semibold">
            <span className="text-primary">
              {employee.info.first_name[0]?.toUpperCase()}{" "}
            </span>
            <span className="text-secondary">
              {employee?.info?.last_name[0]?.toLowerCase()}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold ">
              {employee.info.first_name} {employee.info.last_name}
            </h3>
            <span className="text-sm text-muted/50">{employee.info.email}</span>

            <p className="mt-0.5 text-xs text-gray-500">{employee.info.role}</p>
          </div>
        </div>

        {/* Status */}
        <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            isAvailable ? "text-green-600" : "text-orange-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-green-500" : "bg-orange-500"
            }`}
          />

          {isAvailable ? "Available" : "Busy"}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {employee.jobs.length} active{" "}
          {employee.jobs.length === 1 ? "job" : "jobs"}
        </span>
        {jobServiceId && (
          <button
            className="rounded-lg px-3 py-1.5 text-xs font-medium transition bg-primary flex items-center justify-center text-white w-22 h-9"
            onClick={() => assignJob()}
          >
            {loading ? <Spinner /> : "assign"}
          </button>
        )}
      </div>
    </div>
  );
}
