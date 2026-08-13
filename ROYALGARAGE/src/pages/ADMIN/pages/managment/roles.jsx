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
import { newRole, roleList } from "@/Comp/store/admin/wokerslice";
import { Trash } from "lucide-react";

export default function RolesView() {
  //const [workerList, SetworkerList] = useState();
  const { roles } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roleList());
  }, []);

  const newRoleData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    console.log(formdata);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    dispatch(newRole(data)).then((data) => {});
  };

  const removeRole = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="container-main  mt-3.5">
      <div className="section flex gap-normal ">
        <Table className="">
          <TableCaption>
            {" "}
            <Sheet>
              <SheetTrigger
                render={
                  <h1 className="text-primary cursor-pointer"> + New Role</h1>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className={"text-header heading-normal"}>
                    {" "}
                    Roles{" "}
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <form onSubmit={newRoleData}>
                  <div className="flex  flex-col  gap-normal px-3.5">
                    <Input
                      className={"h-12"}
                      placeholder=" role name "
                      name="role_name"
                    ></Input>
                    <Input
                      className={"h-12"}
                      placeholder=" role description "
                      name="role_descprtion"
                    ></Input>
                  </div>
                  <div className="mt-3.5 flex items-center justify-center">
                    <Button
                      type="submit"
                      variant="secondary"
                      className={"w-2xs h-12"}
                    >
                      add Role
                    </Button>
                  </div>
                </form>
                <SheetFooter>
                  <SheetClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </TableCaption>
          <TableHeader>
            <TableRow className="font-bold">
              <TableHead className={"font-bold text-secondary"}>
                Role Name{" "}
              </TableHead>
              <TableHead className={"font-bold text-primary"}>
                Role description
              </TableHead>
              <TableHead className={"font-bold text-primary"}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((item) => {
              return (
                <TableRow>
                  <TableCell className={""}>{item.role_name}</TableCell>
                  <TableCell>{item.role_descprtion}</TableCell>
                  <TableCell className={"text-destructive"}></TableCell>
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
