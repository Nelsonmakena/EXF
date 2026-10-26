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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorker, getWorkerList, positionList } from "@/store/wokerslice";
import { toast } from "sonner";
import EmployeeCard from "./employeeCard";
import { User } from "lucide-react";
import { getAccountRoles, getRoleList } from "@/store/accountsslice";
import CustomDropDown from "@/Comp/customdropdown";
import { convertArray } from "@/utils/utils";

export default function WorkerView() {
  const [id, setId] = useState({
    account_role_id: "",
    role_id: "",
    position_id: "",
  });
  const {
    worker: { workerList, positions },
    Accounts: { employeeRoles, accountRoles },
  } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (workerList.length == 0) {
      dispatch(getWorkerList());
    }
    dispatch(getRoleList());
    dispatch(getAccountRoles());
    dispatch(positionList());
  }, []);

  //handling the selected id's
  const handleSelected = (field, id) => {
    setId((prev) => ({ ...prev, [field]: id }));
  };

  //add a new employee
  const addWorker = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    data.role_id = role_id;
    data.account_role = accountRole;
    dispatch(addNewWorker(data)).then((data) => {
      if (data?.payload?.success) {
        setRole_id("");
        toast(data?.payload?.message, { position: "top-left" });
        dispatch(getWorkerList());
        setOpen(false);
      } else {
        toast.error(data?.payload?.message, { position: "top-left" });
        setOpen(true);
      }
    });
  };

  return (
    <section className="section-sm">
      <div className=" grid grid-cols-3 gap-normal card ">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
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
                <SheetTitle className={"text-header heading-normal "}>
                  new employee data
                </SheetTitle>
              </SheetHeader>

              <form onSubmit={addWorker}>
                <div className="flex  flex-col  gap-7 px-3.5">
                  <Input
                    className={"h-12"}
                    type={"email"}
                    placeholder="employee-email "
                    name="email"
                    required
                  ></Input>

                  {/* role */}
                  <CustomDropDown
                    placeholder={"role"}
                    item={convertArray(employeeRoles, "role_id", "role_name")}
                    select={(id) => handleSelected("role_id", id)}
                  />
                  {/* account type */}
                  <CustomDropDown
                    placeholder={"account_type"}
                    item={convertArray(
                      accountRoles,
                      "account_role_id",
                      "role_name",
                    )}
                    select={(id) => handleSelected("account_role_id", id)}
                  />

                  {/* position */}
                  <CustomDropDown
                    placeholder={"position"}
                    item={convertArray(
                      positions,
                      "position_id",
                      "position_name",
                    )}
                    select={(id) => handleSelected("position_id", id)}
                  />
                  <div className="mt-3.5 flex items-center justify-center">
                    <Button
                      type="submit"
                      variant="secondary"
                      className={"w-2xs h-12"}
                    >
                      add Employee
                    </Button>
                  </div>
                </div>
              </form>
            </SheetContent>
          </Sheet>
        </div>
        {workerList?.map((item, index) => (
          <EmployeeCard key={index} employee={item} />
        ))}
      </div>
    </section>
  );
}
