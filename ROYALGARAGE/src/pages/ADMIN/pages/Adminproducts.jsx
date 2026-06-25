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

import animatedaddbutton from "/src/assets/addbuttondata.json";
import Lottie from "lottie-react";

export default function AdminViewProducts() {
  return (
    <section className="w-full container-main">
      <div className="section  grid grid-cols-2  s md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/** add item  */}
        <div className="bg-card w-46  rounded-xl  shadow-md  card ">
          <div className=" flex items-center justify-center h-full  border border-dotted  heading-bold ">
            <Sheet>
              <SheetTrigger
                render={
                  <button className="w-full h-full">
                    {" "}
                    <Lottie animationData={animatedaddbutton} />
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
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <label> Product name </label>
                    <Input id="productname" defaultValue="Product-name" />
                  </div>
                  <div className="grid gap-3">
                    <label> Product descrption </label>
                    <Input
                      id="productdescrption"
                      defaultValue="product-descrption"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Product price </label>
                    <Input id="productprice" defaultValue="product-price" />
                  </div>
                  <div className="grid gap-3">
                    <label> Discount </label>
                    <Input id="Discount" defaultValue="Discount" />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit">Add Product</Button>
                  <SheetClose
                    render={<Button variant="outline">Close</Button>}
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className=" bg-card border-border  rounded-xl p-2 flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400">
          {/* Product Image */}
          <div className="flex items-center justify-center h-30 mb-2">
            <img
              src=""
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Product Name */}
          <p className="text-sm text-neutral-500 mb-2 px-2">name </p>

          {/* Price */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-sm font-semibold text-neutral-800">
              ksh price
            </span>
            <span className="text-xs text-neutral-500 line-through">price</span>
          </div>
          <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
            <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
              {" "}
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
