import { X, ShoppingCart } from "lucide-react";

export default function ServiceItem({
  isitemviewopen,
  Setisitemviewopen,
  selectedproduct,
}) {
  return (
    <div className="w-full   h-screen  fixed top-0  flex items-center justify-center z-50   ">
      <div className=" bg-card flex flex-col items-center card  w-3xl rounded-xl h-3/4   ">
        <div className="card flex justify-between w-full">
          <h1 className="heading-normal "> {selectedproduct.service_name} </h1>
          <button
            onClick={() => {
              Setisitemviewopen(!isitemviewopen);
            }}
          >
            {" "}
            <X />
          </button>
        </div>
        <div className="w-full h-1/2">
          <img src={selectedproduct.service_image} />
        </div>
        <div className="card ">
          <p>{selectedproduct.service_descrption}</p>
        </div>
        <div className=" card flex w-full  justify-between ">
          <h1>
            {" "}
            ksh{" "}
            <span className="text-header">
              {" "}
              {selectedproduct.service_price}{" "}
            </span>
            /=
          </h1>
          <button> add to cart</button>
        </div>
      </div>
    </div>
  );
}
