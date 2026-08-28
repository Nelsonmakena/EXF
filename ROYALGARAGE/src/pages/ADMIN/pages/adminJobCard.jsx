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
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AssignJob, jobInfo } from "@/Comp/store/jobsslice";
import { getNonUnassigned } from "@/Comp/store/wokerslice";
import { toast } from "sonner";
export default function AdminJobCard() {
  const { jobInformation } = useSelector((state) => state.jobs);
  const { noWork } = useSelector((state) => state.worker);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { job_services_id } = useParams();

  useEffect(() => {
    dispatch(jobInfo(job_services_id));
    dispatch(getNonUnassigned());
  }, []);

  return (
    <section className="section flex ">
      <div className="border card flex  flex-col gap-normal ">
        <div className="flex gap-normal">
          <h1 className="text-slate-500 tracking-widest font-bold">client:</h1>
          <p>
            {jobInformation?.first_name + " " + jobInformation?.second_name}
          </p>
        </div>
        <div className="flex  gap-normal">
          <h1 className="text-slate-500 tracking-widest font-bold">
            appointment day:
          </h1>
          <p>{jobInformation?.appointment_day}</p>
        </div>
        <div className="flex  gap-normal">
          <h1 className="text-slate-500 tracking-widest font-bold">
            vehicle details:
          </h1>
          <p>
            {jobInformation?.liscence_plate + jobInformation?.vehicle_brand}
          </p>
        </div>
        <div className="flex  gap-normal">
          <h1 className="text-slate-500 tracking-widest font-bold">
            service details:
          </h1>
          <p>{jobInformation?.service_name}</p>
        </div>
      </div>
      <div>
        <Table className="">
          <TableCaption> pending jobs .</TableCaption>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>
                email
              </TableHead>
              <TableHead className={"font-bold text-primary"}>role</TableHead>

              <TableHead className={"font-bold text-primary"}>Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {noWork.length == 0 ? (
              <h1>...</h1>
            ) : (
              noWork.map((item) => {
                return (
                  <TableRow key={item.employee_id}>
                    <TableCell>{item.email}</TableCell>
                    <TableCell className="flex items-center gap-2.5">
                      {item.role_name}
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          const workerData = {
                            employee_id: item.employee_id,
                            job_services_id: job_services_id,
                          };

                          dispatch(AssignJob(workerData)).then((data) => {
                            if (data.payload.success) {
                              toast(data.payload.message);
                              navigate("/admin/tasks/jobs");
                            } else {
                              toast(data.payload.message);
                            }
                          });
                        }}
                      >
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
