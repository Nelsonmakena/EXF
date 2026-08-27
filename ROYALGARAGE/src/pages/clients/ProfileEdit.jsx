import { useNavigate } from "react-router";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mail, Map, Pen, Phone } from "lucide-react";

import Loader from "@/Comp/loader";
import { useDispatch, useSelector } from "react-redux";
import { getClientProfile } from "@/Comp/store/authslice";
import { Button } from "@/components/ui/button";

export default function ProfileEdit() {
  const { profileInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientProfile());
  }, []);

  if (!profileInfo) {
    return <Loader />;
  }

  return (
    <>
      <section className=" container-main  w-full  ">
        <h1 className="w-full  flex justify-center card font-bold text-xl text-accent">
          My profile
        </h1>
        <div className="w-full  flex items-center  card bg-card-bg rounded-md gap-normal h-30  font-bold tracking-widest text-card ">
          <h1 className="ml-3.5">{profileInfo?.first_name}</h1>
          <h1>{profileInfo?.second_name[0]}.</h1>
          <h1>{profileInfo?.last_name}</h1>
        </div>
        <div className=" card  w-full">
          <div className="w-full flex justify-between py-3.5  ">
            <h1 className="text-primary font-bold">Personal information</h1>
            <Button
              variant="outline"
              size="lg"
              className="w-20 tracking-widest"
            >
              edit
              <Pen />
            </Button>
          </div>

          <div className="w-full grid  grid-cols-3 py-3.5 ">
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">First Name </h1>
              <p>{profileInfo.first_name}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Middle Name </h1>
              <p>{profileInfo.second_name}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Last Name </h1>
              <p>{profileInfo.last_name}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 py-3.5">
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Email </h1>
              <p>{profileInfo.email}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Phone </h1>
              <p>{profileInfo.phonenumber}</p>
            </div>
          </div>
        </div>
        <div className="w-full card  ">
          <div className="flex justify-between  py-3.5">
            <h1 className="text-primary font-bold">Address</h1>
            <Button
              variant="outline"
              size="lg"
              className="w-20 tracking-widest"
            >
              edit
              <Pen />
            </Button>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">County </h1>
              <p>nelson</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">city </h1>
              <p>nelson</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500"> street </h1>
              <p>nelson</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
