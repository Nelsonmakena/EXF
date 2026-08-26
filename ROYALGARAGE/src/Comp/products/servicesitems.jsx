import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../store/serviceslice";
export default function ServicesItems() {
  const dispatch = useDispatch();
  const { availableServiceList } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, []);

  return (
    <section className="   ">
      <div className=" grid grid-cols-2  s md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5  ">
        {availableServiceList.map((item) => (
          <div
            key={item.service_id}
            className=" bg-card border-border  rounded-xl  flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400"
          >
            {/* Product Image */}
            <div className="flex items-center justify-center h-30 mb-2 ">
              <img
                src={`/assets/images/${item.service_image}.jpg`}
                alt={item.name}
                className="max-h-full w-full rounded-t-xl  "
              />
            </div>

            {/* Product Name */}
            <p className="text-sm text-neutral-500 mb-2 px-2 cursor-pointer">
              {item.service_name}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-semibold text-neutral-800">
                ksh {item.service_price}
              </span>
              <span className="text-xs text-neutral-500 line-through">
                {item.oldPrice}
              </span>
            </div>
            <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
              <button className="w-full h-full  text-white rounded-md   bg-blue-400 shadow-md ">
                {" "}
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
