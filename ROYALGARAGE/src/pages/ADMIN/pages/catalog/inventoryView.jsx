import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryCard from "./invetroryCard";
import { getCatalogue } from "@/store/productSlice";

export default function InventoryView() {
  const dispatch = useDispatch();
  const { productsCatalogue } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getCatalogue());
  }, []);

  return (
    <section className="section-sm">
      <div className="flex flex-col gap-6 mt-3">
        {productsCatalogue.map((product) => (
          <InventoryCard product={product} />
        ))}
      </div>
    </section>
  );
}
