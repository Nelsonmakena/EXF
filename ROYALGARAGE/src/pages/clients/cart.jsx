import { addCart } from "@/Comp/store/serviceslice";
import { Ad, Minus, Plus, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const { cart } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  console.log(cart);

  const checkout = () => {
    let amount = 0;
    let totalDiscount = 0;
    let totalAmount = 0;
    for (const item in cart) {
      let price = Number(cart[item].product_price) * cart[item].quantity;
      let discount = (Number(cart[item].product_discount) / 100) * price;
      let netAmount = price - discount;
      amount += price;
      totalDiscount += discount;
      totalAmount += netAmount;
    }

    return { amount, totalDiscount, totalAmount };
  };
  const { amount, totalDiscount, totalAmount } = checkout();
  return (
    <section className="container-main flex gap-normal">
      {cart.length == 0 ? (
        <div className="w-full h-screen flex items-center justify-center ">
          <ShoppingCart />
          <h1>cart is empty</h1>
        </div>
      ) : (
        <>
          {" "}
          <div>
            {cart.map((item, index) => {
              return (
                <div className="border w-2xl h-30 flex items-center justify-center gap-normal">
                  <img
                    src={`/assets/images/${item.product_image}.jpg`}
                    alt="alt"
                    className="w-20 h-20 border rounded-md object-cover"
                  />
                  <h1> {item.product_name} </h1>
                  <div className="flex  gap-normal  ">
                    <Minus className="text-destructive" />
                    <h1>{item.quantity} </h1>
                    <Plus
                      className="text-primary"
                      onClick={() => {
                        dispatch(addCart(item));
                      }}
                    />
                  </div>
                  <h1>{item.product_price}</h1>
                </div>
              );
            })}
          </div>
          {/**side panel total amount */}
          <div className=" w-2xs  rounded-2xl  ">
            <div className=" text-primary  font-medium w-full flex justify-center">
              <h1> Order Summary </h1>
            </div>
            <div className="flex flex-col p-3.5 mt-3.5">
              <p className="px-4  h-12">
                {" "}
                items <span className="font-medium"> 3</span>{" "}
              </p>
              <div className=" flex w-full justify-between px-4 h-12">
                <h1> Total billed </h1>
                <h1 className="text-green-700 font-medium text-shadow-md">
                  {" "}
                  {amount}{" "}
                </h1>
              </div>
              <div className=" flex w-full justify-between px-4 h-12">
                <h1> discount </h1>
                <h1 className="text-red-700 font-medium">{totalDiscount}</h1>
              </div>
              <div className=" flex w-full justify-between  h-px border-b-2 border-orange-700  mb-2.5 "></div>

              <div className=" flex w-full justify-between px-4 h-12">
                <h1> Total </h1>
                <h1 className="text-green-700 font-medium text-shadow-md">
                  {" "}
                  {totalAmount}{" "}
                </h1>
              </div>

              <div>
                <button
                  type="submit"
                  className="mt-8 w-1/2 h-11 rounded-md text-white bg-orange-700 hover:opacity-90 transition-opacity"
                >
                  checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
