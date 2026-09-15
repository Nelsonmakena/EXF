import { getCatalogue } from "@/Comp/store/serviceslice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryCard from "./invetroryCard";

export default function InventoryView() {
  const dispatch = useDispatch();
  const { productsCatalogue } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(getCatalogue());
  }, []);
  console.log(productsCatalogue);

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
