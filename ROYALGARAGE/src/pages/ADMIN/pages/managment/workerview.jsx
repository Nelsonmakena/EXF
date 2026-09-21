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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorker, getWorkerList, roleList } from "@/store/wokerslice";
import { toast } from "sonner";
import EmployeeCard from "./employeeCard";
import { User } from "lucide-react";

export default function WorkerView() {
  const [role_id, setRole_id] = useState();
  const { workerList, roles } = useSelector((state) => state.worker);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (workerList.length == 0) {
      dispatch(getWorkerList());
    }
    dispatch(roleList());
  }, []);

  const addWorker = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    data.role_id = role_id;
    dispatch(addNewWorker(data)).then((data) => {
      if (data?.payload?.success) {
        setRole_id("");
        toast(data?.payload?.message, { position: "top-left" });
      } else {
        toast.error(data?.payload?.message, { position: "top-left" });
      }
    });
  };

  return (
    <section className="section-sm">
      <div className=" grid grid-cols-3 gap-normal card ">
        {workerList.map((item, index) => (
          <EmployeeCard key={index} employee={item} />
        ))}

        <div className="rounded-xl border border-primary p-4 transition cursor-pointer flex items-center justify-center ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button className={"h-11 w-30"}>
                  {" "}
                  <User /> + employee
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  employee
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form onSubmit={addWorker}>
                <div className="flex  flex-col  gap-normal px-3.5">
                  <Input
                    className={"h-12"}
                    type={"email"}
                    placeholder="employee-email "
                    name="email"
                    required
                  ></Input>
                  <Select
                    onValueChange={(role) => {
                      const selectedRole = roles.find(
                        (item) => item.role_name === role,
                      );
                      setRole_id(selectedRole.role_id);
                    }}
                  >
                    <SelectTrigger className={"w-full "}>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent className={"w-2xs bg-card "}>
                      {roles.map((item) => (
                        <SelectItem
                          key={item.role_id}
                          value={item.role_name}
                          className={"w-full"}
                        >
                          {item.role_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-3.5 flex items-center justify-center">
                  <Button
                    type="submit"
                    variant="secondary"
                    className={"w-2xs h-12"}
                  >
                    add Employee
                  </Button>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
