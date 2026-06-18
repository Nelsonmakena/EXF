import { useState } from "react";
import ServicesItems from "../../Comp/products/servicesitems";
import ProductsItems from "../../Comp/products/productsitems";

export default function Service() {
  const [ActiveTab, SetActiveTab] = useState("services");
  return (
    <>
      <section className=" flex-col  px-4 py-16 mt-12">
        <div className="flex h-14 space-x-2  m-2.5 p-1  rounded-full">
          <div className="flex items-center ">
            <button
              onClick={() => SetActiveTab("services")}
              className={` h-12 w-26  rounded-md 
                ${ActiveTab === "services" ? "bg-green-400  font-bold shadow-md text-white  transition duration-400 " : "bg-card"}  `}
            >
              <h1>Services</h1>
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => SetActiveTab("products")}
              className={` h-12 w-26  rounded-md ${ActiveTab === "products" ? "bg-green-400 font-bold text-white shadow-md transition duration-400" : "bg-card"}  `}
            >
              <h1>products</h1>
            </button>
          </div>
        </div>

        <div className="w-full md:m-2.5 ">
          {ActiveTab === "services" && <ServicesItems />}
          {ActiveTab === "products" && <ProductsItems />}
        </div>
      </section>
    </>
  );
}
