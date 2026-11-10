import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../Comp/productCard";
import { getProducts } from "@/store/productSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className="section-sm ">
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-stretch justify-center gap-5 ">
        {products.map((item) => (
          <ProductCard product={item} key={item.product_id} client={true} />
        ))}
      </div>
    </section>
  );
}
