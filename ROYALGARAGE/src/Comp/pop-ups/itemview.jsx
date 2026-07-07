import { X, ShoppingCart } from "lucide-react";

export default function ItemView({
  isitemviewopen,
  Setisitemviewopen,
  selectedproduct,
}) {
  return (
    <div className="w-full h-full  fixed  flex items-center justify-center container-main   ">
      <div className=" bg-card flex flex-col items-center card  w-3xl rounded-xl h-3/4   ">
        <div className="card flex justify-between w-full">
          <h1 className="heading-normal "> {selectedproduct.product_name} </h1>
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
          <img src={selectedproduct.product_image} />
        </div>
        <div className="card">
          <p>{selectedproduct.product_descrption}</p>
        </div>
      </div>
    </div>
  );
}
