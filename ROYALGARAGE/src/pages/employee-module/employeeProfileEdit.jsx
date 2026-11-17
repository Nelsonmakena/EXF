import FirstTimeOnbording from "@/Comp/employeefirsttimeonbording";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EmployeeProfileEdit() {
  const { userinfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  if (userinfo?.first_time_login) {
    return <FirstTimeOnbording />;
  }
  console.log(userinfo);

  return (
    <section>
      <div className="w-full  flex items-center  card bg-accent rounded-md gap-normal h-30  font-bold tracking-widest text-card ">
        {/* <h1 className="ml-3.5">{profileInfo.client_info.first_name}</h1>
                      <h1>{AvatarFormatter(profileInfo.client_info.second_name, "U")}.</h1>
                      <h1>{profileInfo.client_info.last_name}</h1> */}
      </div>
      <div className=" card  w-full">
        <div className="w-full flex justify-between py-3.5  ">
          <h1 className="text-primary font-bold">Personal information</h1>
          <Button size="lg" className="w-20 tracking-widest">
            edit
            <Pen />
          </Button>
        </div>

        <div className="w-full grid  grid-cols-3 py-3.5 ">
          <div className="flex flex-col gap-normal">
            <h1 className="text-slate-500">First Name </h1>
            {/* <p>{profileInfo.client_info.first_name}</p> */}
          </div>
          <div className="flex flex-col gap-normal">
            <h1 className="text-slate-500">Middle Name </h1>
            {/* <p>{profileInfo.client_info.second_name}</p> */}
          </div>
          <div className="flex flex-col gap-normal">
            <h1 className="text-slate-500">Last Name </h1>
            {/* <p>{profileInfo.client_info.last_name}</p> */}
          </div>
        </div>
        <div className="grid grid-cols-3 py-3.5">
          <div className="flex flex-col gap-normal ">
            <h1 className="text-slate-500">Email </h1>
            <p className="break-words">
              {/* {profileInfo.client_info.email} */}
            </p>
          </div>
          <div className="flex flex-col gap-normal">
            <h1 className="text-slate-500">Phone </h1>
            {/* <p>{profileInfo.client_info.phone_number}</p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
