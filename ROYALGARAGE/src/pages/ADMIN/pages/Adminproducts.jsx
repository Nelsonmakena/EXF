import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import animatedaddbutton from "/src/assets/addbuttondata.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, newProduct } from "@/store/serviceslice";

import ProductCard from "@/Comp/productCard";
import { toast } from "sonner";
import CustomSheet from "@/Comp/custom-sheet";
import { updateProductInputs } from "@/utils/inputs";
import { Plus } from "lucide-react";

export default function AdminViewProducts() {
  const [open, setOpen] = useState(false);
  const [seletedItem, setSelectedItem] = useState(null);
  const [inputs, setInputs] = useState({
    product_name: "",
    product_image: "",
    product_description: "",
    product_price: "",
    product_category: "",
    product_discount: "",
  });
  const dispatch = useDispatch();
  const { availableProductList } = useSelector((state) => state.services);

  /// fetching data for adding a product
  const addProduct = () => {
    dispatch(newProduct(inputs)).then((results) => {
      if (results.payload.success) {
        setInputs({
          product_name: "",
          product_image: "",
          product_description: "",
          product_price: "",
          product_category: "",
          product_discount: "",
        });
        toast(results.payload.message);
        setOpen(false);
      } else {
        toast(results.payload.message);
        setOpen(true);
      }
    });
  };
  //updating a product
  const updateProduct = (product) => {
    const data = {};

    data.productId = product.product_id;
    dispatch(updateProducts(data)).then((results) => {
      if (results.payload.success) {
        toast(results?.payload?.message);
        dispatch(getProducts());
        setOpen(false);
      } else {
        toast(results?.payload?.message);
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <section className="section-sm ">
      <div className="grid grid-cols-2 md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/**    add item **/}
        <div className="bg-card w-52  rounded-2xl  shadow-md  card ">
          <div className="flex flex-col gap-6 ">
            <div className="w-full ">
              <Lottie animationData={animatedaddbutton} />
            </div>
            <CustomSheet
              trigger={{ icon: Plus, name: "add product" }}
              fields={updateProductInputs}
              actions={{ onFieldChange: setInputs, onSubmit: addProduct }}
              states={{ open: open, setOpen: setOpen }}
            />
          </div>
        </div>

        {availableProductList.map((item) => {
          return (
            <ProductCard
              product={item}
              key={item.product_id}
              admin={true}
              actions={{
                setSelectedItem: setSelectedItem,
                updateProduct: updateProduct,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
