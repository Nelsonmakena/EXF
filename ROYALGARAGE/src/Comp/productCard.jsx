import {
  addCart,
  getProducts,
  removeProduct,
  updateProducts,
} from "@/store/serviceslice";
import { ShoppingCart, Square, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomDropDown from "./customdropdown";
import CustomSheet from "./custom-sheet";
import { updateProductInputs } from "@/utils/inputs";
import { addValue } from "./../utils/utils";
export default function ProductCard({ product, admin, client, actions }) {
  const { updateProduct, deleteProduct, setSelectedItem } = actions ?? {};
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // fetching data & updating a product  sending it

  /// calculating discount in the product object
  const newPrice = () => {
    const discount = Number(product.product_discount) / 100;
    const setPrice = Number(product.product_price);
    const price = setPrice - discount * setPrice;
    return currencyFormat(price);
  };
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow md:w-52">
      {/* Image */}
      <div className="relative h-40 w-full bg-card flex products-center justify-center">
        {product.product_discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {product.product_discount}% Off
          </span>
        )}

        <img
          src={`/assets/images/${product.product_image}.jpg`}
          alt={product.product_name}
          className="h-full w-full object-contain p-3"
        />
      </div>

      {/* Product information */}
      <div className="p-4">
        <p className="text-sm font-medium text-header line-clamp-2 min-h-10">
          {product.product_name}
        </p>

        {/* Price */}
        <div className="mt-2 flex products-center gap-2">
          {product.product_discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {currencyFormat(product.product_price)}
            </span>
          )}

          <span className="text-base font-bold text-accent">{newPrice()}</span>
        </div>

        {/* Add to cart */}
        {client && (
          <Button
            className="w-full mt-4 gap-2"
            onClick={() => {
              dispatch(addCart(product));
              toast(`${product.product_name} added to cart`);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to cart
          </Button>
        )}

        {admin && (
          <CustomSheet
            trigger={{ name: "update", icon: Square }}
            fields={addValue(updateProductInputs, product)}
            title={product.product_name}
            actions={{}}
            states={{
              open: open,
              setOpen: (v) => {
                setOpen(v);
                setSelectedItem(product.product_id);
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
