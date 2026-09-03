import { addCart } from "@/Comp/store/serviceslice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/currencyFormater";
import { Button } from "@/components/ui/button";
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
    return currencyFormat(price);
  };
  return (
    <div className=" bg-card shadow-md transition-colors rounded-xl flex flex-col md:w-46">
      {/* Top row: badge + bookmark */}
      <div className="flex items-center  mb-2 p-1.5  ">
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

      <div className="card">
        <p className="text-sm text-header mb-2 cursor-pointer">
          {product_name}
        </p>

        <div className="flex flex-col  items-center gap-2 md:flex-row">
          <div className="flex items-center gap-normal">
            <h1 className="text-xs md:hidden">Was</h1>
            <span className="text-xs text-destructive line-through">
              {currencyFormat(product_price)}
            </span>
          </div>
          <span className="text-sm font-semibold text-accent">
            {newPrice()}
          </span>
        </div>
        <div className="w-full flex justify-end mt-2.5">
          <Button
            size="icon"
            onClick={() => {
              dispatch(addCart(product));
              toast(`${product_name} added to cart`);
            }}
          >
            <ShoppingCart className="text-white" />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
}
