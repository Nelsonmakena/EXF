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

import { getJobList } from "@/Comp/store/jobsslice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getWorkerList } from "@/Comp/store/wokerslice";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";

export default function JobList() {
  const navigate = useNavigate();
  const { jobsList } = useSelector((state) => state.jobs);
  const { workerList } = useSelector((state) => state.worker);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobList());
    dispatch(getWorkerList());
  }, []);

  // if (jobsList.length == 0) {
  //   return <h1>loading </h1>;
  // }
  console.log(jobsList);

  return (
    <section className="section-sm">
      <div className=" bg-card">
        {/**job card  */}
        <Table className="">
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>
                Details
              </TableHead>
              <TableHead className={"font-bold text-primary"}>Client</TableHead>
              <TableHead className={"font-bold text-secondary"}>
                services
              </TableHead>
              <TableHead className={"font-bold text-primary"}>Assign</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobsList.length == 0 ? (
              <Spinner></Spinner>
            ) : (
              jobsList.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    className="group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-secondary  "
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/20">
                          {item.vehicle.plate[0]}
                          {item.vehicle.plate[6]}
                        </div>

                        <div>
                          <p className="font-semibold text-primary tracking-widest ">
                            {item.vehicle.plate}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {item.vehicle.model} {item.vehicle.brand}
                            <span className="mx-1.5">•</span>
                            {item.vehicle.color}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="grid gap-1">
                          <h1 className="font-bold ">{item.client.name}</h1>
                          <span className="tracking-widest text-secondary ">
                            {" "}
                            {item.client.phone}
                          </span>
                          <p className="text-xs text-gray-500  ">
                            {item.client.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item?.services?.map((service) => (
                        <div className="flex">
                          <div className="inline-flex items-center space-x-1.5 ">
                            <CheckCircle2
                              className="text-primary font-bold"
                              size={10}
                            />
                            <h1>{service.service_name}</h1>
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button onClick={() => navigate(`${item.job_id}`)}>
                          Assign
                        </Button>
                      </div>
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
