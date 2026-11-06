import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SquarePen, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "sonner";
import { addValue, convertArray, currencyFormat } from "@/utils/utils";

import { useNavigate } from "react-router";
import CustomSheet from "./custom-sheet";
import {
  newJobInputs,
  newJobSelect,
  newServiceInputs,
  newServicesSelects,
} from "@/utils/inputs";
import CustomDialog from "./customdialog";
import { newJob } from "@/store/jobsslice";
export default function ServiceCard({ vehicles, service, client, admin }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputs, setInputs] = useState({
    appointment_day: "",
  });

  const [selects, setSelects] = useState({
    vehicle_id: "",
  });
  //setting vehicle select object
  newJobSelect.vehicle.data = vehicles?.map((u) => ({
    vehicle_id: u.vehicle_id,
    vehicle_name:
      u.details.model + " " + u.details.brand + " " + u.details.plate,
  }));

  const newJobSubmission = async () => {
    const data = {
      appointment_day: inputs.appointment_day,
      service_id: selectedItem,
      vehicle_id: selects.vehicle_id,
    };

    dispatch(newJob(data)).then((results) => {
      if (results.payload.success) {
        toast(results.payload.message);
        setOpen(false);
      } else {
        toast(results.payload.message);
        setOpen(true);
      }
    });
  };
  return (
    <div className="bg-card  rounded-xl shadow-xs  flex flex-col  cursor-pointer md:w-52   hover:-translate-y-1 transition duration-400">
      {/* Product Image */}
      <div className="h-30 w-full overflow-hidden rounded-t-xl">
        <LazyLoadImage
          src={`/assets/images/${service.service_image}.jpg`}
          alt={service.service_name}
          effect="blur"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-normal ">
        <div className="flex  px-2 py-3">
          <p className="text-sm text-primary cursor-pointer py-3 px-1  ">
            {service.service_name}
          </p>
        </div>
        <div className="inline-flex items-center justify-center">
          <h1 className="text-gray-500 inline-flex">Price</h1>
          <span className="text-sm font-semibold text-accent py-3 px-4">
            {currencyFormat(service.service_price)}
          </span>
        </div>

        {/* getting the service logic*/}
        {client && (
          <div>
            <CustomDialog
              title={service.service_name}
              trigger={{ icon: User, name: "book now" }}
              fields={newJobInputs}
              selectFields={newJobSelect}
              actions={{
                onSubmit: newJobSubmission,
                onFieldChange: setInputs,
                onSelectChange: setSelects,
              }}
              states={{
                open: open,
                setOpen: (v) => {
                  setOpen(v);
                  setSelectedItem(service.service_id);
                },
              }}
            />
          </div>
        )}
        {admin && (
          <div className="">
            {" "}
            <CustomSheet
              title={service.service_name}
              trigger={{ icon: SquarePen, name: "edit" }}
              fields={addValue(newServiceInputs, service)}
              selectFields={newServicesSelects}
              states={{
                open: open,
                setOpen: (v) => {
                  setOpen(v);
                  if (v) {
                    setSelectedItem(service);
                  }
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
