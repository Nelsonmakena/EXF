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

import animatedaddbutton from "/src/assets/addbuttondata.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, newService } from "@/Comp/store/serviceslice";
import ServiceCard from "@/pages/clients/ServiceCard";
import { toast } from "sonner";

export default function AdminViewServices() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { availableServiceList } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  // adding a service
  const addService = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    dispatch(newService(data)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        dispatch(getServices());
        setOpen(false);
      } else {
        toast(data.payload.message);
        setOpen(true);
      }
    });
  };

  return (
    <section className="w-full container-main">
      <div className="section  grid grid-cols-2   md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/** add item  */}
        <div className="bg-card w-52  rounded-2xl  shadow-md  card ">
          <div className=" flex flex-col gap-6  ">
            <div className="w-full ">
              <Lottie animationData={animatedaddbutton} />
            </div>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button className={"w-full h-11 tracking-widest"}>
                    add service
                  </Button>
                }
              />
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className={"text-header heading-normal"}>
                    {" "}
                    Add Product{" "}
                  </SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <form onSubmit={addService}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <label> Service name </label>
                      <Input name="service_name" required />
                    </div>
                    <div className="grid gap-3">
                      <label> service image </label>
                      <Input name="service_image" required />
                    </div>
                    <div className="grid gap-3">
                      <label> service description </label>
                      <Input name="service_description" required />
                    </div>
                    <div className="grid gap-3">
                      <label> service price </label>
                      <Input name="service_price" required />
                    </div>
                    <div className="grid gap-3">
                      <label> Category </label>
                      <Input name="service_category" required />
                    </div>
                    <div className="grid gap-3">
                      <label> Discount </label>
                      <Input name="service_discount" required />
                    </div>
                  </div>
                  <div className="card flex justify-center">
                    <Button type="submit" className="  w-full h-11">
                      Add Service
                    </Button>
                  </div>
                </form>
                <SheetFooter></SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/*list of services */}

        {availableServiceList.map((item) => {
          return <ServiceCard service={item} admin={true} />;
        })}
      </div>
    </section>
  );
}
