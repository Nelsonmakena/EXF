import animatedaddbutton from "/src/assets/addbuttondata.json";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getServiceCategories,
  getServices,
  newService,
} from "@/store/serviceslice";
import ServiceCard from "@/Comp/ServiceCard";
import { toast } from "sonner";
import CustomSheet from "@/Comp/custom-sheet";
import { Plus } from "lucide-react";
import { newServiceInputs, newServicesSelects } from "@/utils/inputs";
import { convertArray } from "@/utils/utils";

export default function AdminViewServices() {
  const { serviceCategories } = useSelector((state) => state.services);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    service_name: "",
    service_image: "",
    service_description: "",
    service_price: "",
    service_discount: "",
  });
  const [id, setId] = useState({
    service_category_id: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { availableServiceList } = useSelector((state) => state.services);

  //setter
  newServicesSelects.categories.data = serviceCategories;

  useEffect(() => {
    dispatch(getServices());
    dispatch(getServiceCategories());
  }, []);
  // adding a service
  const addService = () => {
    const data = {
      ...inputs,
      service_category_id: id.service_category_id,
    };
    console.log(data);

    dispatch(newService(data)).then((result) => {
      if (result.payload.success) {
        toast(result.payload.message);
        dispatch(getServices());
        setOpen(false);
      } else {
        toast(result.payload.message);
        setOpen(true);
      }
    });
  };
  //update service info
  const updateService = async (e, item) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.service_id = item.service_id;
    dispatch(updateServices(data)).then((data) => {
      if (data.payload.success) {
        dispatch(getServices());
        toast(data.payload.message);
        setOpen(false);
      } else {
        toast(data.payload.success);
        setOpen(true);
      }
    });
  };
  return (
    <section className="w-full section-sm">
      <div className=" grid grid-cols-2   md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5   ">
        {/** add item  */}
        <div className="bg-card w-52  rounded-2xl  shadow-md  card ">
          <div className=" flex flex-col gap-6  ">
            <div className="w-full ">
              <Lottie animationData={animatedaddbutton} />
            </div>
            <CustomSheet
              trigger={{ icon: Plus, name: "Add service" }}
              fields={newServiceInputs}
              selectFields={newServicesSelects}
              actions={{
                onSubmit: addService,
                onFieldChange: setInputs,
                onSelectChange: setId,
              }}
              states={{ open: open, setOpen: setOpen }}
            />
          </div>
        </div>

        {/*list of services */}

        {availableServiceList.map((item) => {
          return (
            <ServiceCard
              key={item.service_id}
              service={item}
              admin={true}
              actions={{
                updateService: updateService,
                setSelectedItem: setSelectedItem,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
