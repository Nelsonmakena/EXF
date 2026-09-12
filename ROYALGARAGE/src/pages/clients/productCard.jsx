import { addCart } from "@/Comp/store/serviceslice";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/utils";
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
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow md:w-52">
      {/* Image */}
      <div className="relative h-40 w-full bg-card flex items-center justify-center">
        {product_discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product_discount}% Off
          </span>
        )}

        <img
          src={`/assets/images/${product_image}.jpg`}
          alt={product_name}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Product information */}
      <div className="p-4">
        <p className="text-sm font-medium text-header line-clamp-2 min-h-10">
          {product_name}
        </p>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          {product_discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {currencyFormat(product_price)}
            </span>
          )}

          <span className="text-base font-bold text-accent">{newPrice()}</span>
        </div>

        {/* Add to cart */}
        <Button
          className="w-full mt-4 gap-2"
          onClick={() => {
            dispatch(addCart(product));
            toast(`${product_name} added to cart`);
          }}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
