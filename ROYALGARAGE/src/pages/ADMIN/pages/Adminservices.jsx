import animatedaddbutton from "/src/assets/addbuttondata.json";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import { getServices, newService } from "@/store/serviceslice";
import ServiceCard from "@/Comp/ServiceCard";
import { toast } from "sonner";
import CustomSheet from "@/Comp/custom-sheet";
import { Plus } from "lucide-react";
import { newServiceInputs } from "@/utils/inputs";

export default function AdminViewServices() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    service_name: "",
    service_image: "",
    service_description: "",
    service_price: "",
    service_category: "",
    service_discount: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const { availableServiceList } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, []);
  // adding a service
  const addService = () => {
    dispatch(newService(inputs)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        dispatch(getServices());
        setOpen(false);
      } else {
        toast(data.payload.message);
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
              actions={{ onSubmit: addService, onFieldChange: setInputs }}
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
