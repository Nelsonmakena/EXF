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

export default function AdminViewProducts() {
  const [Product, SetProduct] = useState([]);

  /// fecttching products
  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/allproducts",
      );
      SetProduct(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  /// fetching data for adding a product & sending that data
  const addproduct = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    axios.post("http://localhost:3000/api/products/addproduct", data);
  };

  // fetching data & updating a product  sending it

  const update_product = (e, item) => {
    e.preventDefault();
    const productid = item.product_id;
    console.log(productid);

    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    axios.put(`http://localhost:3000/api/products/update/${productid}`, data);
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

                <form onSubmit={addproduct}>
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

        {Product.map((item) => {
          return (
            <div
              key={item.product_id}
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
                        {item.product_name}
                      </SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>

                    <form
                      onSubmit={(e) => {
                        update_product(e, item);
                      }}
                    >
                      <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                          <label> Product name </label>
                          <Input
                            name="product_name"
                            id="productname"
                            defaultValue={item.product_name}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Product image </label>
                          <Input
                            name="product_image"
                            id="productdescrption"
                            defaultValue={item.product_name}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Product descrption </label>
                          <Input
                            name="product_description"
                            id="productdescrption"
                            defaultValue={item.product_descrption}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Product price </label>
                          <Input
                            name="product_price"
                            id="productprice"
                            defaultValue={item.product_price}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Category </label>
                          <Input
                            name="product_category"
                            id="product_category"
                            defaultValue={item.product_category}
                          />
                        </div>
                        <div className="grid gap-3">
                          <label> Discount </label>
                          <Input
                            name="product_discount"
                            id="Discount"
                            defaultValue={item.product_discount}
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
