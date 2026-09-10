// import { Car, Check, Clock3, Eye, MoreHorizontal, Search } from "lucide-react";

// function WorkerJobs() {
//   const jobs = [
//     {
//       id: "JOB-1028",
//       client: "John Kamau",
//       vehicle: "Toyota Harrier",
//       plate: "KCA 321Z",
//       services: 3,
//       appointment: "Today, 09:00 AM",
//       status: "Pending Acceptance",
//     },
//     {
//       id: "JOB-1027",
//       client: "Mary Wanjiku",
//       vehicle: "Mazda CX-5",
//       plate: "KCB 452A",
//       services: 2,
//       appointment: "Today, 10:30 AM",
//       status: "Pending Acceptance",
//     },
//     {
//       id: "JOB-1026",
//       client: "Peter Mwangi",
//       vehicle: "Subaru Forester",
//       plate: "KCD 789B",
//       services: 4,
//       appointment: "Sep 6, 2026",
//       status: "In Progress",
//     },
//     {
//       id: "JOB-1025",
//       client: "Grace Njeri",
//       vehicle: "Toyota Prado",
//       plate: "KDE 234C",
//       services: 1,
//       appointment: "Sep 6, 2026",
//       status: "Completed",
//     },
//     {
//       id: "JOB-1024",
//       client: "David Otieno",
//       vehicle: "Nissan X-Trail",
//       plate: "KDF 567D",
//       services: 2,
//       appointment: "Sep 5, 2026",
//       status: "In Progress",
//     },
//   ];

//   return (
//     <div className="container-main">
//       <main className="py-6 md:py-8">
//         {/* HEADER */}
//         <div className="mb-6">
//           <p className="mb-2 text-sm font-medium text-primary">Worker Portal</p>

//           <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//             <div>
//               <h1 className="text-2xl font-bold md:text-3xl">My Jobs</h1>

//               <p className="mt-2 text-sm text-muted-foreground">
//                 View your assigned jobs and manage your current work.
//               </p>
//             </div>

//             {/* SEARCH */}
//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//               <input
//                 placeholder="Search jobs..."
//                 className="h-10 w-full rounded-xl border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
//               />
//             </div>
//           </div>
//         </div>

//         {/* SUMMARY */}
//         <div className="mb-6 grid gap-4 sm:grid-cols-3">
//           <div className="rounded-xl border bg-card p-5">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-muted-foreground">Pending</p>

//               <Clock3 className="h-5 w-5 text-yellow-500" />
//             </div>

//             <p className="mt-3 text-2xl font-bold">2</p>
//           </div>

//           <div className="rounded-xl border bg-card p-5">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-muted-foreground">In Progress</p>

//               <Car className="h-5 w-5 text-primary" />
//             </div>

//             <p className="mt-3 text-2xl font-bold">2</p>
//           </div>

//           <div className="rounded-xl border bg-card p-5">
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-muted-foreground">Completed</p>

//               <Check className="h-5 w-5 text-green-500" />
//             </div>

//             <p className="mt-3 text-2xl font-bold">1</p>
//           </div>
//         </div>

//         {/* JOB TABLE */}
//         <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
//           {/* TABLE HEADER */}
//           <div className="border-b px-5 py-4">
//             <h2 className="font-semibold">Assigned Jobs</h2>

//             <p className="mt-1 text-xs text-muted-foreground">
//               Jobs assigned to you by the administrator
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px]">
//               <thead>
//                 <tr className="border-b bg-muted/30 text-left">
//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Job
//                   </th>

//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Client
//                   </th>

//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Vehicle
//                   </th>

//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Services
//                   </th>

//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Appointment
//                   </th>

//                   <th className="px-5 py-3 text-xs font-medium text-muted-foreground">
//                     Status
//                   </th>

//                   <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y">
//                 {jobs.map((job) => (
//                   <tr
//                     key={job.id}
//                     className="transition-colors hover:bg-muted/30"
//                   >
//                     {/* JOB */}
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold">{job.id}</p>

//                       <p className="mt-1 text-xs text-muted-foreground">
//                         Assigned job
//                       </p>
//                     </td>

//                     {/* CLIENT */}
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium">{job.client}</p>
//                     </td>

//                     {/* VEHICLE */}
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                           <Car className="h-4 w-4" />
//                         </div>

//                         <div>
//                           <p className="text-sm font-medium">{job.vehicle}</p>

//                           <p className="text-xs text-muted-foreground">
//                             {job.plate}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* SERVICES */}
//                     <td className="px-5 py-4">
//                       <span className="text-sm">{job.services} services</span>
//                     </td>

//                     {/* APPOINTMENT */}
//                     <td className="px-5 py-4">
//                       <p className="text-sm">{job.appointment}</p>
//                     </td>

//                     {/* STATUS */}
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//                           job.status === "Completed"
//                             ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
//                             : job.status === "In Progress"
//                               ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
//                               : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
//                         }`}
//                       >
//                         {job.status}
//                       </span>
//                     </td>

//                     {/* ACTION */}
//                     <td className="px-5 py-4">
//                       <div className="flex justify-end gap-2">
//                         {job.status === "Pending Acceptance" && (
//                           <button className="rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">
//                             Accept Job
//                           </button>
//                         )}

//                         {job.status === "In Progress" && (
//                           <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium hover:bg-muted">
//                             <Eye className="h-3.5 w-3.5" />
//                             Open
//                           </button>
//                         )}

//                         <button className="rounded-lg p-2 hover:bg-muted">
//                           <MoreHorizontal className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default WorkerJobs;

import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Clock3,
  Play,
  Wrench,
} from "lucide-react";

export default function WorkerJobServices() {
  const services = [
    {
      id: 1,
      name: "Engine Diagnostics",
      description:
        "Check engine system for fault codes and identify possible issues.",
      status: "In Progress",
      started: "09:15 AM",
      progress: 65,
    },
    {
      id: 2,
      name: "Brake Inspection",
      description:
        "Inspect brake pads, discs, brake fluid and overall brake system.",
      status: "Pending",
      started: null,
      progress: 0,
    },
    {
      id: 3,
      name: "Full Oil Change",
      description:
        "Drain old engine oil and replace oil filter and engine oil.",
      status: "Completed",
      started: "08:40 AM",
      progress: 100,
    },
  ];

  return (
    <div className="container-main">
      <main className="py-6 md:py-8">
        {/* BACK */}
        <button className="mb-5 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </button>

        {/* JOB HEADER */}
        <div className="mb-6 rounded-2xl border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Car className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs font-medium text-primary">JOB-1028</p>

                <h1 className="mt-1 text-xl font-bold md:text-2xl">
                  Toyota Harrier
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  KCA 321Z · John Kamau
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                In Progress
              </span>

              <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
                3 Services
              </span>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Job Services</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update the progress of each service assigned to you.
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-xl border bg-card p-5 shadow-sm"
              >
                {/* SERVICE TOP */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Wrench className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{service.name}</h3>

                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                      service.status === "Completed"
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : service.status === "In Progress"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                {/* PROGRESS */}
                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>

                    <span className="font-medium">{service.progress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${service.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="h-4 w-4" />

                    {service.started
                      ? `Started ${service.started}`
                      : "Not started yet"}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    {service.status === "Pending" && (
                      <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90">
                        <Play className="h-3.5 w-3.5" />
                        Start Service
                      </button>
                    )}

                    {service.status === "In Progress" && (
                      <>
                        <button className="rounded-lg border px-4 py-2 text-xs font-medium hover:bg-muted">
                          Update Progress
                        </button>

                        <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-xs font-medium text-white hover:opacity-90">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Complete
                        </button>
                      </>
                    )}

                    {service.status === "Completed" && (
                      <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
