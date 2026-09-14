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

import {
  addCart,
  getProducts,
  removeProduct,
  updateProducts,
} from "@/Comp/store/serviceslice";
import { ShoppingCart, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { currencyFormat } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function ProductCard({ product, admin, client }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // fetching data & updating a product  sending it
  const update_product = (e, product) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    data.productId = product.product_id;
    dispatch(updateProducts(data)).then((data) => {
      if (data.payload.success) {
        toast(data?.payload?.message);
        dispatch(getProducts());
        setOpen(false);
      } else {
        toast(data?.payload?.message);
        setOpen(true);
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button className={" flex mt-4 h-11 w-full tracking-widest"}>
                  Edit
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  {product.product_name}
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form
                onSubmit={(e) => {
                  update_product(e, product);
                }}
              >
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <label> Product name </label>
                    <Input
                      name="product_name"
                      id="productname"
                      defaultValue={product.product_name}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Product image </label>
                    <Input
                      name="product_image"
                      id="productdescrption"
                      defaultValue={product.product_name}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Product descrption </label>
                    <Input
                      name="product_description"
                      id="productdescription"
                      defaultValue={product.product_description}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Product price </label>
                    <Input
                      name="product_price"
                      id="productprice"
                      defaultValue={product.product_price}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Category </label>
                    <Input
                      name="product_category"
                      id="product_category"
                      defaultValue={product.product_category}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Discount </label>
                    <Input
                      name="product_discount"
                      id="Discount"
                      defaultValue={product.product_discount}
                    />
                  </div>
                </div>
                <div className="card flex flex-col gap-2.5 justify-center">
                  <Button type="submit" className=" bg-primary  h-12">
                    {" "}
                    update{" "}
                  </Button>
                </div>
              </form>

              <SheetFooter>
                <Button
                  variant="destructive"
                  className={"h-12"}
                  onClick={() => {
                    dispatch(removeProduct(product.product_id)).then((data) => {
                      if (data?.payload?.success) {
                        toast(data.payload.message);
                        dispatch(getProducts());
                        setOpen(false);
                      } else {
                        toast(data.payload.message);
                        setOpen(true);
                      }
                    });
                  }}
                >
                  {" "}
                  <Trash />
                  remove
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
