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
import { getJobList } from "@/Comp/store/admin/jobsslice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function JobList() {
  const { jobsList } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  //fething job list

  useEffect(() => {
    dispatch(getJobList());
  }, []);
  console.log(jobsList);

  return (
    <section className="conatiner-main ">
      <div className=" section flex flex-col gap-normal">
        {/**job card  */}

        <Table className="">
          <TableCaption> pendig jobs .</TableCaption>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>
                client_name
              </TableHead>
              <TableHead className={"font-bold text-primary"}>
                client_vehicle
              </TableHead>
              <TableHead className={"font-bold text-secondary"}>Job</TableHead>
              <TableHead className={"font-bold text-primary"}>Assign</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsList.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.first_name + item.last_name}</TableCell>
                  <TableCell className="flex items-center gap-2.5">
                    <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                      {" "}
                      <h1 className="text-header font-bold">
                        {item.liscence_plate[0]}{" "}
                      </h1>
                      <h1 className="text-header-foreground">
                        {" "}
                        {item.liscence_plate[6]}{" "}
                      </h1>
                    </div>
                    {item.liscence_plate}
                  </TableCell>

                  <TableCell>{item.service_name}</TableCell>
                  <TableCell>
                    <Button> Assign</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
