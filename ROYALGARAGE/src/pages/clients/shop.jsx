import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/store/serviceslice";
import ProductCard from "../../Comp/productCard";

export default function Shop() {
  const dispatch = useDispatch();
  const { availableProductList } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className="section-sm ">
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-stretch justify-center gap-5 ">
        {availableProductList.map((item) => (
          <ProductCard product={item} key={item.product_id} client={true} />
        ))}
      </div>
    </section>
  );
}
