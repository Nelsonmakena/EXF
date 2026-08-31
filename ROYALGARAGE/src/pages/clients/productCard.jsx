import { addCart } from "@/Comp/store/serviceslice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
export default function ProductCard({
  product,
  product_discount,
  product_id,
  product_image,
  product_price,
  product_name,
}) {
  const dispatch = useDispatch();
  /// calculating discount in the product object
  const newPrice = () => {
    const discount = Number(product_discount) / 100;
    const setPrice = Number(product_price);
    const price = setPrice - discount * setPrice;
    return price;
  };
  return (
    <div className="card bg-card shadow-md transition-colors rounded-xl flex flex-col w-46">
      {/* Top row: badge + bookmark */}
      <div className="flex items-center  mb-2  ">
        <div
          className={` ${product_discount === 0 || null ? "hidden" : "bg-accent text-neutral-800 text-xs px-2 py-0.5 rounded-full"}`}
        >
          <span className="font-bold text-white">
            {product_discount + "%"} Off
          </span>{" "}
        </div>
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center h-30 w-full">
        <img
          src={`/assets/images/${product_image}.jpg`}
          alt={product_name}
          className="max-h-full max-w-full object-contain "
        />
      </div>

      {/* Product Name */}
      <p className="text-sm text-header mb-2 px-2 cursor-pointer">
        {product_name}
      </p>

      {/* Price */}
      <div className="flex items-center gap-2 px-2">
        <span className="text-sm font-semibold text-neutral-800">
          ksh {newPrice()}
        </span>
        <span className="text-xs text-neutral-500 line-through">
          {product_price}/=
        </span>
        <div>
          <button>
            <ShoppingCart
              onClick={() => {
                dispatch(addCart(product));
                toast(`${product_name} added to cart`);
              }}
              className="text-header"
            />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
