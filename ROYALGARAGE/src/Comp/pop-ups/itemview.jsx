import { X, ShoppingCart } from "lucide-react";

export default function ItemView({
  isitemviewopen,
  Setisitemviewopen,
  selectedproduct,
}) {
  return (
    <div className="w-full   h-screen  fixed top-0  flex items-center justify-center z-50    ">
      <div className=" bg-card flex flex-col items-center card  w-3xl rounded-xl h-3/4  shadow-2xl  ">
        <div className="card flex justify-between w-full">
          <h1 className="heading-normal text-header  ">
            {" "}
            {selectedproduct.product_name}{" "}
          </h1>
          <button
            onClick={() => {
              Setisitemviewopen(!isitemviewopen);
            }}
          >
            {" "}
            <X />
          </button>
        </div>
        <div className="w-full h-1/2 flex  justify-center">
          <img
            src={`/assets/images/${selectedproduct.product_image}.jpg`}
            className="max-h-full max-w-full object-contain  "
          />
        </div>
        <div className="card ">
          <p>{selectedproduct.product_descrption}</p>
        </div>
        <div className=" card flex w-full  justify-between ">
          <h1>
            {" "}
            ksh{" "}
            <span className="text-header">
              {" "}
              {selectedproduct.product_price}{" "}
            </span>
            /=
          </h1>
          <button className=" h-12 w-26  rounded-md bg-header ">
            {" "}
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
