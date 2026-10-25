import axios from "axios";

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { getRoleList } from "@/store/accountsslice";
import { Trash, Trash2, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  deleteRole,
  getAccountRoles,
  removeAccountRole,
  updateAccountRole,
} from "@/store/accountsslice";

export default function RolesCard({ item, isAdmin, isSystem, actions }) {
  const [openDeleteDialog, SetOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch();
  const changeItem = (actions) => {
    console.log(actions);

    switch (actions) {
      case "removeAccountRole":
        dispatch(removeAccountRole(item.account_role_id)).then((results) => {
          if (results?.payload.success) {
            toast(results.payload.message);
            dispatch(getAccountRoles());
          } else {
            toast(results.payload.message);
          }
        });
        break;

      case "updateAccountRole":
        dispatch(updateAccountRole(data)).then((results) => {
          if (results?.payload.success) {
            toast(results.payload.message);
            dispatch(getAccountRoles());
          } else {
            toast(results.payload.message);
          }
        });
        break;

      case "removeEmployeeRole":
        dispatch(deleteRole(item.role_id)).then((results) => {
          if (results?.payload.success) {
            toast(results.payload.message);
            SetOpenDeleteDialog(false);
          } else {
            toast(results.payload.message);
            SetOpenDeleteDialog(true);
          }
        });

        break;
      case "updateEmployeeRole":
        break;
      default:
        console.log("Unknown action");
    }
  };

  return (
    <div className="rounded-md p-4 transition cursor-pointer shadow-sm border">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-primary ">
              {item.role_name || item.position_name}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              {item.role_description || item.position_description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {item?.total_number && (
          <h1 className="text-[12px] tracking-widest text-muted">
            total employees
            <span
              className={`font-bold px-2 ${item.total_number > 0 ? "text-accent" : "text-destructive"}`}
            >
              {item?.total_number}
            </span>
          </h1>
        )}

        {isSystem && (
          <Dialog open={openDeleteDialog} onOpenChange={SetOpenDeleteDialog}>
            <DialogTrigger
              render={
                <Button size="icon">
                  <Trash2 className="size-4 " />
                </Button>
              }
            ></DialogTrigger>
            <DialogContent className={"bg-card "}>
              <DialogHeader>
                <DialogTitle>{item.role_name}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="h-36 flex flex-col justify-between card ">
                <h1>Are you sure you want to delete the above role</h1>
                <Button
                  onClick={() =>
                    changeItem(
                      actions?.removeAccountRole || actions?.removeEmployeeRole,
                    )
                  }
                >
                  Confirm
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        {isSystem | isAdmin && (
          <Sheet
          // open={open} onOpenChange={setOpen}
          >
            <SheetTrigger
              render={
                <Button size="icon">
                  <SquarePen />
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  {item.role_name}
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form className="flex  flex-col px-3.5 gap-10 ">
                <Input
                  className={"h-12"}
                  placeholder={item.role_name}
                  name="role_name"
                ></Input>
                <Input
                  className={"h-12"}
                  placeholder="role_description"
                  name="role_description"
                ></Input>

                <Button
                  type="submit"
                  variant={`${isSystem ? "default" : "secondary"}`}
                  className="w-2xs h-12"
                >
                  update
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
