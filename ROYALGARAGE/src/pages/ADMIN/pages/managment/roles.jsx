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

import { toast } from "sonner";
import { roleList } from "@/Comp/store/admin/wokerslice";

export default function RolesView() {
  //const [workerList, SetworkerList] = useState();
  const { roles } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roleList());
  }, []);

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

                <form>
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
              <TableHead className={"font-bold text-secondary"}>
                Role Name{" "}
              </TableHead>
              <TableHead className={"font-bold text-primary"}>
                Role descprtion
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((item) => {
              return (
                <TableRow>
                  <TableCell className={""}>{item.role_name}</TableCell>
                  <TableCell>{item.role_descprtion}</TableCell>
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
