import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import Cart from "./cart";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";
import { addCart, getProducts } from "@/Comp/store/serviceslice";

export default function Shop() {
  const dispatch = useDispatch();
  const { loading, availableProductList, cart } = useSelector(
    (state) => state.services,
  );

  // if (loading) {
  //   return <Spinner></Spinner>;
  // }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  /// calculating discount in the product object
  const newPrice = (products) => {
    const discount = Number(products.product_discount) / 100;
    const setPrice = Number(products.product_price);
    const price = setPrice - discount * setPrice;
    return price;
  };
  console.log(cart);

  return (
    <section className="container-main">
      <div className="grid grid-cols-2  md:flex md:flex-wrap items-stretch justify-center gap-5 ">
        {availableProductList.map((item) => {
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
              <p className="text-sm text-header mb-2 px-2 cursor-pointer">
                {item.product_name}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  ksh {newPrice(item)}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  {item.product_price}/=
                </span>
                <div>
                  <button>
                    <ShoppingCart
                      onClick={() => {
                        dispatch(addCart(item));
                      }}
                      className="text-header"
                    />{" "}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
