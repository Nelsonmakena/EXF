import { Button } from "@/components/ui/button";
import { getServiceCategories } from "@/store/serviceslice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function ServiceCategories() {
  const dispatch = useDispatch();
  const { serviceCategories } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(getServiceCategories());
  }, []);
  return (
    <section>
      <div className="py-3">
        <Button>new category</Button>
      </div>
      <div className="w-full h-14 px-4  flex justify-between items-center  rounded-md border border-primary/20  bg-card">
        <div className="border ">
          <h1>icon</h1>
        </div>
        <div>
          <h1>category name </h1>
        </div>
        <div>
          <h1>role involved </h1>
        </div>
      </div>
    </section>
  );
}
