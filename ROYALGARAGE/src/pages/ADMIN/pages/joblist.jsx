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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getJobList } from "@/Comp/store/jobsslice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getWorkerList } from "@/Comp/store/wokerslice";
import { useNavigate, useParams } from "react-router";

export default function JobList() {
  const navigate = useNavigate();
  const { jobsList } = useSelector((state) => state.jobs);
  const { workerList } = useSelector((state) => state.worker);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobList());
    dispatch(getWorkerList());
  }, []);

  return (
    <section className="container-main ">
      <div className=" section flex flex-col gap-normal">
        {/**job card  */}
        <Table className="">
          <TableCaption> pending jobs .</TableCaption>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>Name</TableHead>
              <TableHead className={"font-bold text-primary"}>
                vehicle
              </TableHead>
              <TableHead className={"font-bold text-secondary"}>
                service
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
                  <TableRow key={index}>
                    <TableCell>
                      {item.first_name + " " + item.last_name}
                    </TableCell>
                    <TableCell className="flex items-center gap-2.5">
                      <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                        {" "}
                        <h1 className="text-header font-bold">
                          {item.license_plate[0]}{" "}
                        </h1>
                        <h1 className="text-header-foreground">
                          {" "}
                          {item.license_plate[6]}{" "}
                        </h1>
                      </div>
                      {item.license_plate}
                    </TableCell>

                    <TableCell>{item.service_name}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate(`${item.job_services_id}`);
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
