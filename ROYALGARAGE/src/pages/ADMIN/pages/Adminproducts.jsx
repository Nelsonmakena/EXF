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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, newProduct } from "@/Comp/store/serviceslice";

import ProductCard from "@/pages/clients/productCard";
import { toast } from "sonner";

export default function AdminViewProducts() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { availableProductList } = useSelector((state) => state.services);

  /// fetching data for adding a product
  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    dispatch(newProduct(data)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        setOpen(false);
      } else {
        toast(data.payload.message);
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className="section-sm ">
      <div className="grid grid-cols-2 md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/**    add item
         *
         *
         *
         */}
        <div className="bg-card w-52  rounded-2xl  shadow-md  card ">
          <div className="flex flex-col gap-6 ">
            <div className="w-full ">
              <Lottie animationData={animatedaddbutton} />
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button className="w-full h-11 tracking-widest">
                    add product
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

                <form onSubmit={addProduct}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <label> Product name </label>
                      <Input name="product_name" defaultValue="Product-name" />
                    </div>
                    <div className="grid gap-3">
                      <label> Product image </label>
                      <Input name="product_image" defaultValue="image" />
                    </div>
                    <div className="grid gap-3">
                      <label> Product description </label>
                      <Input
                        name="product_description"
                        defaultValue="product-description"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Product price </label>
                      <Input
                        name="product_price"
                        defaultValue="product-price"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Category </label>
                      <Input name="product_category" defaultValue="General" />
                    </div>
                    <div className="grid gap-3">
                      <label> Discount </label>
                      <Input name="product_discount" defaultValue="Discount" />
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {availableProductList.map((item) => {
          return (
            <ProductCard product={item} key={item.product_id} admin={true} />
          );
        })}
      </div>
    </section>
  );
}
