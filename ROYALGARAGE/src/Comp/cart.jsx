import { addCart } from "@/store/serviceslice";
import { currencyFormat } from "@/utils/utils";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
  const { cart } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const checkout = cart.reduce(
    (totals, item) => {
      const price = Number(item.product_price) * item.quantity;

      const discount = (Number(item.product_discount) / 100) * price;

      totals.amount += price;
      totals.totalDiscount += discount;
      totals.totalAmount += price - discount;

      return totals;
    },
    {
      amount: 0,
      totalDiscount: 0,
      totalAmount: 0,
    },
  );

  const { amount, totalDiscount, totalAmount } = checkout;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="container-main flex min-h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <ShoppingCart className="size-12" />

          <h1 className="text-lg font-medium">Your cart is empty</h1>

          <p className="text-sm">
            Add some products to your cart to get started.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-main grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Cart Items */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Shopping Cart</h1>

          <p className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.product_id}
              className="flex items-center gap-4 rounded-xl border bg-card p-4"
            >
              {/* Product image */}
              <img
                src={`/assets/images/${item.product_image}.jpg`}
                alt={item.product_name}
                className="size-20 rounded-lg border object-cover"
              />

              {/* Product information */}
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-medium">{item.product_name}</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {currencyFormat(Number(item.product_price))}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 rounded-lg border p-1">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-md hover:bg-muted"
                >
                  <Minus className="size-4" />
                </button>

                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => dispatch(addCart(item))}
                  className="flex size-8 items-center justify-center rounded-md hover:bg-muted"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              {/* Item total */}
              <div className="hidden w-28 text-right font-medium sm:block">
                {currencyFormat(Number(item.product_price) * item.quantity)}
              </div>

              {/* Remove */}
              <button
                type="button"
                className="text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <aside className="h-fit rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="mt-5 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>

            <span className="font-medium">{totalItems}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total billed</span>

            <span>{currencyFormat(amount)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>

            <span className="text-destructive">
              -{currencyFormat(totalDiscount)}
            </span>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>

              <span className="text-xl font-semibold text-primary">
                {currencyFormat(totalAmount)}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-3 h-11 w-full rounded-lg bg-primary font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Checkout
          </button>
        </div>
      </aside>
    </section>
  );
}
