import axios from "axios";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function ProductsItems() {
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
  return (
    <section>
      <div className="grid grid-cols-2  md:flex md:flex-wrap items-stretch justify-center gap-5">
        {products.map((item, index) => {
          return (
            <div
              key={index}
              className="border-border bg-card shadow-md transition-colors rounded-xl p-2 flex flex-col w-46"
            >
              {/* Top row: badge + bookmark */}
              <div className="flex items-center justify-between mb-2">
                <span className="bg-lime-300 text-neutral-800 text-xs px-2 py-0.5 rounded-full">
                  <span className="font-bold">
                    {item.product_discount + "%"}
                  </span>{" "}
                  off
                </span>
              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center h-30 mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Product Name */}
              <p className="text-sm text-neutral-500 mb-2 px-2">
                {item.product_name}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2 px-2">
                <span className="text-sm font-semibold text-neutral-800">
                  {newprice(item)}
                </span>
                <span className="text-xs text-neutral-500 line-through">
                  {item.product_price}
                </span>
                <div>
                  <button>
                    <ShoppingCart />{" "}
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
