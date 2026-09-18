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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { deleteRole, newRole, roleList } from "@/store/wokerslice";
import { Trash, Trash2 } from "lucide-react";

export default function RolesView() {
  const [open, SetOPen] = useState(false);
  const { roles } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(roleList());
  }, []);
  console.log(roles);

  const newRoleData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    console.log(formdata);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    dispatch(newRole(data)).then((data) => {
      if (data.payload.success) {
        SetOPen(false);
      } else {
        SetOPen(true);
      }
    });
  };

  const removeRole = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal card ">
        {roles.map((role) => {
          return (
            <div
              className={`rounded-xl border p-4 transition cursor-pointer ${role.total_number > 0 ? "border-primary/20" : "border-destructive/20"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-primary ">
                      {role.role_name}
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {role.role_description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <h1 className="text-[12px] tracking-widest text-muted">
                  total employees
                  <span
                    className={`font-bold px-2 ${role.total_number > 0 ? "text-accent" : "text-destructive"}`}
                  >
                    {role.total_number}
                  </span>
                </h1>
                <Dialog>
                  <DialogTrigger render={<Trash2 />}></DialogTrigger>
                  <DialogContent className={"bg-card "}>
                    <DialogHeader>
                      <DialogTitle>{role.service_name}</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="h-36 flex flex-col justify-between card ">
                      <h1>Are you sure you want to delete the above role</h1>
                      <Button
                        onClick={() => {
                          dispatch(deleteRole(role.role_id));
                        }}
                      >
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
        <div className="rounded-xl border border-primary p-4 transition cursor-pointer flex items-center justify-center ">
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
                <SheetClose render={<Button variant="outline">Close</Button>} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
