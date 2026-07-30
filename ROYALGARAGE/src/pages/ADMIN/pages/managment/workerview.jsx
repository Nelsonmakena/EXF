import axios from "axios";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorker, getWorkerList } from "@/Comp/store/admin/wokerslice";
import { toast } from "sonner";

export default function WorkerView() {
  //const [workerList, SetworkerList] = useState();
  const { workerlist } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWorkerList());
  }, []);
  console.log(workerlist);

  const addWorker = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    dispatch(addNewWorker(data)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message, { position: "top-left" });
      } else {
        toast.error(data?.payload?.message, { position: "top-left" });
      }
    });
  };

  return (
    <section className="container-main  mt-3.5">
      {/**card info like total employess employess with worke */}
      <div className="  w-full  flex items-center card   ">
        <div className="w-30 shadow-md h-20 flex flex-col items-center justify-center bg-accent rounded-md ">
          <h1>No of Workers</h1>
          <h1> 5</h1>
        </div>
      </div>

      <div className="section flex gap-normal ">
        <Table className="">
          <TableCaption>
            {" "}
            <Sheet>
              <SheetTrigger
                render={
                  <h1 className="text-primary cursor-pointer">
                    {" "}
                    New emmployee
                  </h1>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className={"text-header heading-normal"}>
                    {" "}
                    New Employee{" "}
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <form onSubmit={addWorker}>
                  <div className=" card flex  flex-col justify-center h-full">
                    <div className="grid gap-3">
                      <label> Email </label>
                      <Input name="email" required type={"email"} />
                    </div>
                    <div className="grid gap-3">
                      <label> Role </label>
                      <Input name="postion" required />
                    </div>
                  </div>
                  <div className="card flex justify-center">
                    <Button type="submit" className={"w-2xs"}>
                      add{" "}
                    </Button>
                  </div>
                </form>
                <SheetFooter>
                  <SheetClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>{" "}
          </TableCaption>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>Name</TableHead>
              <TableHead className={"font-bold text-primary"}>Role</TableHead>
              <TableHead className={"font-bold text-secondary"}>
                active job{" "}
              </TableHead>
              <TableHead className={"font-bold text-primary"}>
                Assign job{" "}
              </TableHead>
              <TableHead className={"font-bold text-primary"}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workerlist.map((employee) => {
              return (
                <TableRow>
                  <TableCell className={""}>
                    <div className="flex  items-center gap-normal">
                      <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                        {" "}
                        <h1 className="text-accent font-bold">
                          {employee.first_name == null
                            ? null
                            : employee.first_name[0]?.toUpperCase()}
                        </h1>
                        <h1 className="text-primary font-bold">
                          {employee.last_name == null
                            ? null
                            : employee.last_name[0].toUpperCase()}
                        </h1>
                      </div>
                      {employee.first_name + " " + employee.last_name}
                    </div>
                  </TableCell>
                  <TableCell>{employee.postion}</TableCell>

                  <TableCell>active job </TableCell>
                  <TableCell>
                    <Button> Assign</Button>
                  </TableCell>
                  <TableCell>
                    <Button size="lg" className={"bg-accent"}>
                      {" "}
                      Send message
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
