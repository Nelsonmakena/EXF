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
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AssignJob, jobInfo } from "@/Comp/store/jobsslice";
import { getNonUnassigned } from "@/Comp/store/wokerslice";
import { toast } from "sonner";
export default function AdminJobCard() {
  const { jobInformation } = useSelector((state) => state.jobs);
  const { noWork } = useSelector((state) => state.worker);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { job_id } = useParams();

  useEffect(() => {
    dispatch(jobInfo());
  }, []);

  return (
    <section className="section md:flex lg:flex-col ">
      {/* client details */}
      <div className=" rounded-2xl border border-accent/20 bg-card shadow-sm  hover:border-accent ">
        <div className="inline-flex"></div>
      </div>
    </section>
  );
}
