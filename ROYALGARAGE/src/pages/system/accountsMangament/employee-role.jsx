import RolesCard from "@/Comp/roleCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { newRole, getRoleList } from "@/store/accountsslice";
export default function EmployeeRoles() {
  const [open, SetOPen] = useState(false);
  const dispatch = useDispatch();
  const { employeeRoles } = useSelector((state) => state.Accounts);
  const actions = {
    removeEmployeeRole: "removeEmployeeRole",
    updateEmployeeRole: "updateEmployeeRole",
  };
  const newRoleData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = Object.fromEntries(formdata.entries());

    dispatch(newRole(data)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        SetOPen(false);
        dispatch(getRoleList());
      } else {
        toast(data.payload.message);
        SetOPen(true);
      }
    });
  };

  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <Sheet open={open} onOpenChange={SetOPen}>
            <SheetTrigger
              render={<Button className={"h-11 w-30"}>+ New Role</Button>}
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
                    name="role_description"
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
                <SheetClose render={<Button variant="outline">Close</Button>} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {employeeRoles.map((role) => (
          <RolesCard item={role} isSystem={true} actions={actions} />
        ))}
      </div>
    </section>
  );
}
