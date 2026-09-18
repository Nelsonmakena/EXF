import { getProducts, getServices } from "@/store/serviceslice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Map } from "lucide-react";
import ProductCard from "@/Comp/productCard";
import ServiceCard from "@/Comp/ServiceCard";

export default function Service() {
  const { availableServiceList, availableProductList } = useSelector(
    (state) => state.services,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
    dispatch(getProducts());
  }, []);

  return (
    <>
      <section className="section">
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-stretch justify-center gap-5">
          {availableProductList.map((product) => (
            <ProductCard product={product} />
          ))}
          {availableServiceList.map((service) => (
            <ServiceCard service={service} />
          ))}
        </div>
      </section>
    </>
  );
}
