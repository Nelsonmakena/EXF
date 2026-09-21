import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { Mail, Map, Pen, Phone } from "lucide-react";

import Loader from "@/Comp/loader";
import { useDispatch, useSelector } from "react-redux";
import { getClientProfile } from "@/store/client";
import { Button } from "@/components/ui/button";

export default function ProfileEdit() {
  const [open, setOpen] = useState(false);
  const { profileInfo } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientProfile());
  }, []);

  if (!profileInfo) {
    return <Loader />;
  }
  console.log(typeof profileInfo);

  return (
    <>
      <section className="">
        <div className="w-full  flex items-center  card bg-card-bg rounded-md gap-normal h-30  font-bold tracking-widest text-card ">
          <h1 className="ml-3.5">{profileInfo?.client_info.first_name}</h1>
          <h1>{profileInfo?.client_info.second_name[0]}.</h1>
          <h1>{profileInfo?.client_info.last_name}</h1>
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
              <p>{profileInfo.client_info.first_name}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Middle Name </h1>
              <p>{profileInfo.client_info.second_name}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Last Name </h1>
              <p>{profileInfo.client_info.last_name}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 py-3.5">
            <div className="flex flex-col gap-normal ">
              <h1 className="text-slate-500">Email </h1>
              <p className="break-words">{profileInfo.client_info.email}</p>
            </div>
            <div className="flex flex-col gap-normal">
              <h1 className="text-slate-500">Phone </h1>
              <p>{profileInfo.client_info.phone_number}</p>
            </div>
          </div>
        </div>

        {profileInfo.client_info.address.map((item, index) => (
          <div
            key={item.id}
            className="
      card mt-4 w-full overflow-hidden rounded-xl
      border bg-card
      transition-shadow hover:shadow-md
    "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Map size={20} />
                </div>

                <div>
                  <h2 className="font-bold">Address {index + 1}</h2>

                  <p className="text-sm text-muted-foreground">
                    Your saved location
                  </p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Pen size={15} />
                    Edit
                  </Button>
                </DialogTrigger>

                <DialogContent className="bg-card">
                  <DialogHeader>
                    <DialogTitle>Edit Address</DialogTitle>

                    <DialogDescription>
                      Update your address information below.
                    </DialogDescription>
                  </DialogHeader>

                  {/* Your form goes here */}

                  <div className="flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <Button>Save changes</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Address information */}
            <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">County</p>

                <p className="mt-1 font-medium">{item.county}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">City</p>

                <p className="mt-1 font-medium">{item.city}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Street</p>

                <p className="mt-1 font-medium">{item.street}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
