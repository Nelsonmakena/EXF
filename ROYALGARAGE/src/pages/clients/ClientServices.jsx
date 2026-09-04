import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "@/Comp/store/serviceslice";
import { getVehiclelist } from "@/Comp/store/vehicleslice";
import { Spinner } from "@/components/ui/spinner";

import ServiceCard from "./ServiceCard";

export default function ClientServices() {
  const { vehicles } = useSelector((state) => state.vehicle);
  const { availableServiceList } = useSelector((state) => state.services);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
    dispatch(getVehiclelist());
  }, []);

  return (
    <>
      <section className=" section-sm">
        <div className="grid grid-cols-2   md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5  ">
          {availableServiceList.length == 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <Spinner></Spinner>
            </div>
          ) : (
            availableServiceList.map((item) => (
              <ServiceCard
                key={item.service_id}
                name={item.service_name}
                price={item.service_price}
                image={item.service_image}
                id={item.service_id}
                vehicles={vehicles}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
