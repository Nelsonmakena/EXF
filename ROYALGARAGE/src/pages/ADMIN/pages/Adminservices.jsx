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

export default function AdminViewServices() {
  const [services, Setservices] = useState([]);
  console.log(services);

  /// geting services
  const getServiceslist = async () => {
    try {
      const servicedata = await axios.get(
        "http://localhost:3000/api/services/allservices",
      );
      Setservices(servicedata.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getServiceslist();
  }, []);

  /// updating a service

  const update_service = (e, item) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  };
  // adding a service
  const addservice = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  };
  return (
    <section className="w-full container-main">
      <div className="section  grid grid-cols-2  s md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/** add item  */}
        <div className="bg-card w-46  rounded-xl  shadow-md  card ">
          <div className=" flex items-center justify-center h-full   heading-bold ">
            <Sheet>
              <SheetTrigger
                render={
                  <button className="w-full h-full">
                    {" "}
                    <Lottie animationData={animatedaddbutton} />
                    <h1 className="text-body text-header"> add product</h1>
                  </button>
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

                <form onSubmit={addservice}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <label> Service name </label>
                      <Input name="service_name" />
                    </div>
                    <div className="grid gap-3">
                      <label> service image </label>
                      <Input name="service_image" />
                    </div>
                    <div className="grid gap-3">
                      <label> service descrption </label>
                      <Input name="service_description" />
                    </div>
                    <div className="grid gap-3">
                      <label> service price </label>
                      <Input name="service_price" />
                    </div>
                    <div className="grid gap-3">
                      <label> Category </label>
                      <Input name="service_category" />
                    </div>
                    <div className="grid gap-3">
                      <label> Discount </label>
                      <Input name="service_discount" />
                    </div>
                  </div>
                  <div className="card flex justify-center">
                    <button
                      type="submit"
                      className=" bg-primary w-full rounded-2xl h-14"
                    >
                      Add product
                    </button>
                  </div>
                </form>
                <SheetFooter>
                  <SheetClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/*list of services */}

        {services.map((item) => {
          return (
            <div
              key={item.service_id}
              className=" bg-card border-border  rounded-xl p-2 flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400"
            >
              {/* Product Image */}
              <div className="flex items-center justify-center h-30 mb-2">
                <img
                  src=""
                  alt=""
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Name */}
              <p className="text-sm text-neutral-500 mb-2 px-2">
                {" "}
                {item.service_name}{" "}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  {item.service_price}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  price
                </span>
              </div>

              {/**edit  product side controls */}
              <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
                <Sheet>
                  <SheetTrigger
                    render={
                      <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
                        {" "}
                        Edit
                      </button>
                    }
                  />
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle className={"text-header heading-normal"}>
                        {item.service_name}
                      </SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>

                    <form
                      onSubmit={(e) => {
                        update_service(e, item);
                      }}
                    >
                      <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                          <label> service name </label>
                          <Input
                            name="service_name"
                            defaultValue={item.service_name}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> service image </label>
                          <Input
                            name="service_image"
                            defaultValue={item.service_name}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> service descrption </label>
                          <Input
                            name="service_description"
                            defaultValue={item.service_descrption}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> service price </label>
                          <Input
                            name="service_price"
                            defaultValue={item.service_price}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Category </label>
                          <Input
                            name="service_category"
                            defaultValue={item.service_category}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Discount </label>
                          <Input
                            name="service_discount"
                            defaultValue={item.service_discount}
                          />
                        </div>
                      </div>
                      <div className="card flex flex-col gap-2.5 justify-center">
                        <button
                          type="submit"
                          className=" bg-primary w-full rounded-2xl h-14"
                        >
                          {" "}
                          update{" "}
                        </button>
                      </div>
                    </form>
                    <SheetFooter>
                      <SheetClose
                        render={<Button variant="outline">Close</Button>}
                      />
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
