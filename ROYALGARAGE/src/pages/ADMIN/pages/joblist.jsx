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

import { getJobList } from "@/store/jobsslice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getWorkerList } from "@/store/wokerslice";
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
                      <TableCell className="align-top">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 font-bold text-secondary">
                            {item.client.name?.[0]}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold">{item.client.name}</p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.client.phone}
                            </p>

                            <p
                              className="max-w-48 break-words text-xs text-muted-foreground"
                              title={item.client.email}
                            >
                              {item.client.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        {item?.services?.map((service) => (
                          <div
                            key={service.job_services_id}
                            className="group relative flex items-center gap-2 rounded-md border bg-card px-3 py-2 transition-colors hover:bg-muted/40"
                          >
                            <div className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-primary" />

                            <CheckCircle2
                              size={15}
                              className="ml-1 text-primary"
                            />

                            <span className="text-sm font-medium">
                              {service.service_name}
                            </span>
                          </div>
                        ))}
                      </div>
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
