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
import axios from "axios";
import { useEffect, useState } from "react";

/// fecttching products

export default function AdminViewProducts() {
  const [Product, SetProduct] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/allproducts",
      );
      SetProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  /// adding products
  const handlesubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    axios.post("http://localhost:3000/api/products/addproduct", data);
  };
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

                <form onSubmit={handlesubmit}>
                  <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                      <label> Product name </label>
                      <Input
                        name="product_name"
                        id="productname"
                        defaultValue="Product-name"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Product image </label>
                      <Input
                        name="product_image"
                        id="productdescrption"
                        defaultValue="image"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Product descrption </label>
                      <Input
                        name="product_description"
                        id="productdescrption"
                        defaultValue="product-descrption"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Product price </label>
                      <Input
                        name="product_price"
                        id="productprice"
                        defaultValue="product-price"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Category </label>
                      <Input
                        name="product_category"
                        id="product_category"
                        defaultValue="General"
                      />
                    </div>
                    <div className="grid gap-3">
                      <label> Discount </label>
                      <Input
                        name="product_discount"
                        id="Discount"
                        defaultValue="Discount"
                      />
                    </div>
                  </div>
                  <div className="card flex justify-center">
                    <button
                      type="submit"
                      className=" bg-primary w-full rounded-2xl h-14"
                    >
                      {" "}
                      Add product{" "}
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

        {Product.map((item, index) => {
          return (
            <div
              key={index}
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
                {item.product_name}{" "}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  {item.product_price}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  price
                </span>
              </div>
              <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
                <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
                  {" "}
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
