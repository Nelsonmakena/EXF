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

import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { deleteRole, newRole, getRoleList } from "@/store/wokerslice";
import { Trash, Trash2 } from "lucide-react";

export default function RolesCard({ item, isAdmin, isSystem }) {
  const [open, SetOPen] = useState(false);
  const removeRole = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`rounded-xl border p-4 transition cursor-pointer ${item.total_number > 0 ? "border-primary/20" : "border-destructive/20"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-primary ">
              {item.role_name}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              {item.role_description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-[12px] tracking-widest text-muted">
          total employees
          <span
            className={`font-bold px-2 ${item.total_number > 0 ? "text-accent" : "text-destructive"}`}
          >
            {item.total_number}
          </span>
        </h1>
        {isSystem && (
          <Dialog>
            <DialogTrigger render={<Trash2 />}></DialogTrigger>
            <DialogContent className={"bg-card "}>
              <DialogHeader>
                <DialogTitle>{item.service_name}</DialogTitle>
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
        )}
      </div>
    </div>
  );
}
