import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addCart } from "@/store/serviceslice";
import { Pen, ShoppingCart, Square, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CustomSheet from "./custom-sheet";
import { updateProductInputs } from "@/utils/inputs";
import { addValue } from "./../utils/utils";
import { getProducts, removeProduct } from "@/store/productSlice";
export default function ProductCard({ product, admin, client }) {
  const [open, setOpen] = useState({
    openEdit: false,
    openDelete: false,
  });
  const [inputs, setInputs] = useState({
    product_name: "",
    product_image: "",
    product_description: "",
    product_price: "",
    product_category: "",
    product_discount: "",
  });
  const dispatch = useDispatch();
  // fetching data & updating a product  sending it

  //updating a product
  const updateProduct = () => {
    const data = {
      product_name: inputs.product_name,
      product_image: inputs.product_image,
      product_description: inputs.product_description,
      product_price: inputs.product_price,
      product_category: inputs.product_category,
      product_discount: inputs.product_discount,
      productId: product.product_id,
    };

    dispatch(updateProducts(data)).then((results) => {
      if (results?.payload?.success) {
        toast(results.payload.message);
        dispatch(getProducts());
        setInputs({
          product_name: "",
          product_image: "",
          product_description: "",
          product_price: "",
          product_category: "",
          product_discount: "",
        });
        setOpen((prev) => ({ ...prev, openEdit: false }));
      } else {
        toast(results.payload.message);
        setOpen((prev) => ({ ...prev, openEdit: true }));
      }
    });
  };

  //deleting a product
  const deleteProduct = () => {
    dispatch(removeProduct(product.product_id)).then((results) => {
      if (results?.payload?.success) {
        toast(results.payload.message);
        dispatch(getProducts());
        setOpen((prev) => ({ ...prev, openDelete: false }));
      } else {
        toast(results.payload.message);
        setOpen((prev) => ({ ...prev, openDelete: true }));
      }
    });
  };

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

        <div className="w-full flex justify-between px-2">
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

          {/* updating a product */}
          {admin && (
            <CustomSheet
              trigger={{ name: "update", icon: Pen }}
              initiator={"small"}
              fields={addValue(updateProductInputs, product)}
              title={product.product_name}
              actions={{ onFieldChange: setInputs, onSubmit: updateProduct }}
              states={{
                open: open.openEdit,
                setOpen: (value) =>
                  setOpen((prev) => ({
                    ...prev,
                    openEdit: value,
                  })),
              }}
            />
          )}
          {/* remove a product */}
          {admin && (
            <Dialog
              open={open.openDelete}
              onOpenChange={(value) =>
                setOpen((prev) => ({ ...prev, openDelete: value }))
              }
            >
              <DialogTrigger
                render={
                  <Button size="icon" variant="destructive">
                    <Trash />
                  </Button>
                }
              ></DialogTrigger>
              <DialogContent className={"bg-card"}>
                <DialogHeader>
                  <DialogTitle>{product.product_name}</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                  <p> Are you sure you want to remove the product</p>
                </div>
                <Button onClick={() => deleteProduct()} variant="destructive">
                  delete
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
