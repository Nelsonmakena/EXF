import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import ItemView from "../pop-ups/itemview";
import { description } from "./../../pages/ADMIN/pages/Datacharts/Totalservices";

import car1 from "../../assets/images/car1.png";

export default function ProductsItems() {
  const [isitemviewopen, Setisitemviewopen] = useState(false);
  const [selectedproduct, Setselectedproduct] = useState();

  // setting for no scrollabele when the pop_up is open
  useEffect(() => {
    if (isitemviewopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isitemviewopen]);

  const [products, Setproducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/allproducts",
      );

      Setproducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  /// calulting discount in the product object
  const newprice = (products) => {
    const discount = Number(products.product_discount) / 100;
    const setprice = Number(products.product_price);
    const price = setprice - discount * setprice;
    return price;
  };

  // displayiing item standalone

  // adding items to cart
  return (
    <section>
      <div className="grid grid-cols-2  md:flex md:flex-wrap items-stretch justify-center gap-5 ">
        {products.map((item) => {
          return (
            <div
              key={item.product_id}
              className="border-border bg-card shadow-md transition-colors rounded-xl p-2 flex flex-col w-46"
            >
              {/* Top row: badge + bookmark */}
              <div className="flex items-center  mb-2  ">
                <span
                  className={` ${item.product_discount === 0 ? "hidden" : "bg-accent text-neutral-800 text-xs px-2 py-0.5 rounded-full"}`}
                >
                  <span className="font-bold">
                    {item.product_discount + "%"}
                  </span>{" "}
                  off
                </span>
              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center h-30 w-full">
                <img
                  src={`/assets/images/${item.product_image}.jpg`}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain "
                />
              </div>

              {/* Product Name */}
              <p
                onClick={() => {
                  Setisitemviewopen(!isitemviewopen);
                  Setselectedproduct(item);
                }}
                className="text-sm text-header mb-2 px-2 cursor-pointer"
              >
                {item.product_name}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  ksh {newprice(item)}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  {item.product_price}/=
                </span>
                <div>
                  <button>
                    <ShoppingCart className="text-header" />{" "}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*items viewer */}

      {isitemviewopen && (
        <ItemView
          isitemviewopen={isitemviewopen}
          Setisitemviewopen={Setisitemviewopen}
          selectedproduct={selectedproduct}
          newprice={newprice}
        />
      )}
    </section>
  );
}
