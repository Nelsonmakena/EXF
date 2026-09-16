import { formatDate, formatTime } from "@/utils/utils";
import { CarFront, ChevronRight, Clock3, Wrench } from "lucide-react";
export default function EmployeeJobCard({ item }) {
  return (
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
          <div className="inline-flex  items-center gap-2 rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span>{formatTime(item.assignedAt)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => dispatch(acceptJob(item.assignmentId))}
        className="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Accept
      </button>
    </div>
  );
}
