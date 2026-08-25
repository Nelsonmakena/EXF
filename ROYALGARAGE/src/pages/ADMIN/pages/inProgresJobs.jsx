import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";
import { getInprogressJobs } from "@/Comp/store/jobsslice";
export default function InprogressJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInprogressJobs());
  }, []);
  const { inProgress } = useSelector((state) => state.jobs);
  return (
    <section className="section-sm">
      {" "}
      <Table className="">
        <TableCaption> in progress jobs .</TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableHead className={"font-bold text-secondary"}>
              appointment_day
            </TableHead>
            <TableHead className={"font-bold text-primary"}>vehicle</TableHead>
            <TableHead className={"font-bold text-secondary"}>
              service
            </TableHead>
            <TableHead className={"font-bold text-primary"}>email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inProgress.length == 0 ? (
            <Spinner></Spinner>
          ) : (
            inProgress.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.appointment_day}</TableCell>
                  <TableCell className="flex items-center gap-2.5">
                    <div className="flex gap-normal">
                      <h1> {item.vehicle_model}</h1>
                      <h1> {item.liscence_plate}</h1>
                    </div>
                  </TableCell>
                  <TableCell>{item.service_name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
}
