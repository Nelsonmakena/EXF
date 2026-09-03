import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/Comp/store/serviceslice";
import ProductCard from "./productCard";

export default function Shop() {
  const dispatch = useDispatch();
  const { loading, availableProductList, cart } = useSelector(
    (state) => state.services,
  );

  // if (loading) {
  //   return <Spinner></Spinner>;
  // }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className="section-sm ">
      <div className="grid grid-cols-2 md:flex md:flex-wrap items-stretch justify-center gap-5 ">
        {availableProductList.map((item) => (
          <ProductCard
            product={item}
            key={item.product_id}
            product_name={item.product_name}
            product_discount={item.product_discount}
            product_image={item.product_image}
            product_price={item.product_price}
            product_id={item.product_id}
          />
        ))}
      </div>
    </section>
  );
}
