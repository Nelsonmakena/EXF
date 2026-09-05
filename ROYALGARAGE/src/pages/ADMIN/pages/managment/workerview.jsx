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
import { addNewWorker, getWorkerList, roleList } from "@/Comp/store/wokerslice";
import { toast } from "sonner";
import EmployeeCard from "./employeeCard";

export default function WorkerView() {
  const [role_id, setRole_id] = useState();
  const { workerList } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    if (workerList.length == 0) {
      dispatch(getWorkerList());
    }
  }, []);

  const addWorker = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    data.role_id = role_id;
    console.log(data);

    dispatch(addNewWorker(data)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message, { position: "top-left" });
      } else {
        toast.error(data?.payload?.message, { position: "top-left" });
      }
    });
  };
  console.log(workerList);

  return (
    <section className="section-sm">
      <div className=" grid grid-cols-3 gap-normal card ">
        {workerList.map((item, index) => (
          <EmployeeCard key={index} employee={item} />
        ))}
      </div>
    </section>
  );
}
