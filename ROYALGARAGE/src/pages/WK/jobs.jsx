import { myJobList } from "@/Comp/store/jobsslice";
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
import { useDispatch, useSelector } from "react-redux";

export default function WkJobs() {
  const dispatch = useDispatch();
  const { jobsList } = useSelector((state) => state.jobs);
  useEffect(() => {
    dispatch(myJobList());
  }, []);

  return (
    <section className="section ">
      <div>
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
              <TableHead className={"font-bold text-primary"}>status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsList.map((item) => (
              <TableRow key={item.job_services_id}>
                <TableCell className="flex items-center gap-2.5">
                  {item.service_name}
                </TableCell>
                <TableCell>{item.appointment_day}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
