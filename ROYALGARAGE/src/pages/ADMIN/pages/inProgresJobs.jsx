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
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { getInprogressJobs } from "@/Comp/store/jobsslice";
export default function InprogressJobs() {
  const { inProgress } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInprogressJobs());
  }, []);

  if (inProgress.length == 0) {
    return (
      <div className=" w-full h-screen flex items-center justify-center">
        <h1>no jobs Data</h1>
      </div>
    );
  }
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

              <TableHead className={"font-bold text-secondary"}>
                services
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inProgress.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  className="group cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-secondary  "
                >
                  <TableCell className="align-top  p-4">
                    <div className="flex flex-col gap-normal h-full ">
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
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col gap-normal  ">
                      {item?.services?.map((service) => (
                        <div
                          className=" relative grid grid-cols-3 items-center overflow-hidden rounded-md border bg-card px-4 py-3.5 shadow-xs
                           "
                        >
                          <div className=" absolute left-0 top-0 h-full w-1 bg-primary" />
                          <div className="flex items-center">
                            <CheckCircle2
                              className="text-primary font-bold"
                              size={10}
                            />
                            <h1>{service.service_name}</h1>
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                              <span className="h-2 w-2 rounded-full bg-blue-600" />
                              pending
                            </span>
                          </div>

                          <div className=" flex space-x-1 items-center">
                            <h1>{service.assignedTo.first_name}</h1>
                            <h1>{service.assignedTo.last_name}</h1>
                          </div>
                          {/* <div className="right-0 ">
                              <p className="text-[10px]">assigned At </p>
                            </div> */}
                        </div>
                      ))}
                    </div>
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
