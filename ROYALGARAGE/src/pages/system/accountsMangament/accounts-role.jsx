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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountRoles,
  newAccountRole,
} from "./../../../store/accountsslice";
import RolesCard from "@/Comp/roleCard";
import { toast } from "sonner";
export default function AccountsRoles() {
  const [open, SetOpen] = useState(false);
  const { AccountRoles } = useSelector((state) => state.Accounts);
  const dispatch = useDispatch();

  const actions = {
    updateAccountRole: "updateAccountRole",
    removeAccountRole: "removeAccountRole",
  };

  useEffect(() => {
    dispatch(getAccountRoles());
  }, []);
  const newRoleData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    dispatch(newAccountRole(data)).then((result) => {
      if (result.payload.success) {
        toast(result.payload.message);
        SetOpen(false);
      } else {
        toast(result.payload.message);
        SetOpen(true);
      }
    });
  };
  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal card ">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <Sheet open={open} onOpenChange={SetOpen}>
            <SheetTrigger
              render={
                <Button className={"h-11 w-30"}> New account Role</Button>
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

              <form
                onSubmit={newRoleData}
                className="flex  flex-col px-3.5 gap-10 "
              >
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

                <Button
                  type="submit"
                  variant="secondary"
                  className={"w-2xs h-12"}
                >
                  add Role
                </Button>
              </form>
              <SheetFooter>
                <SheetClose render={<Button variant="outline">Close</Button>} />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        {AccountRoles?.map((item) => (
          <RolesCard isSystem={true} item={item} actions={actions} />
        ))}
      </div>
    </section>
  );
}
