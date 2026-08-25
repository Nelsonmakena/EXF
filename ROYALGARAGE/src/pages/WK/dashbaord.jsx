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
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { acceptJob, assignedJobsList } from "@/Comp/store/jobsslice";
import { getWorkerDashboard } from "@/Comp/store/dashboardstarts";

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
          <div className=" flex justify-center items-center h-12 shadow-xs">
            {" "}
            <h1 className="text-destructive ">No jobs </h1>{" "}
          </div>
        ) : (
          <Table className="">
            <TableCaption>my job list</TableCaption>
            {/* list of jobs  */}
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead className={"font-bold text-secondary"}>
                  service name
                </TableHead>
                <TableHead className={"font-bold text-secondary"}>
                  Day Of Service
                </TableHead>
                <TableHead className={"font-bold text-primary"}>
                  status
                </TableHead>
                <TableHead className={"font-bold text-secondary"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedJobs.map((item) => (
                <TableRow key={item.job_services_id}>
                  <TableCell className="flex items-center gap-2.5">
                    {item.service_name}
                  </TableCell>
                  <TableCell>{item.appointment_day}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className={"flex justify-between  "}>
                    <Button
                      onClick={() => {
                        dispatch(acceptJob(item.job_services_id));
                      }}
                    >
                      accept
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
