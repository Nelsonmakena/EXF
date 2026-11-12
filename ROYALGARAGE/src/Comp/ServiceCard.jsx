import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { SquarePen, Trash, User } from "lucide-react";
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
import { getServices, updateServices } from "@/store/serviceslice";
export default function ServiceCard({ vehicles, service, client, admin }) {
  //state for  sheet and dialog
  const [open, setOpen] = useState({
    openEdit: false,
    openDelete: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //client geting a service
  const [inputs, setInputs] = useState({
    appointment_day: "",
  });

  //updating service inputs
  const [updateInputs, setUpdateInputs] = useState({
    service_name: "",
    service_image: "",
    service_description: "",
    service_price: "",
    service_discount: "",
  });

  //service updating selects

  const [updateSelects, setUpdateSelects] = useState({
    service_category_id: "",
  });

  //setting the default value for the selects

  newServicesSelects.categories.defaultValue = service.service_category_id;

  //client dropdown for vehicle select when getting a service
  const [selects, setSelects] = useState({
    vehicle_id: "",
  });

  //setting vehicle select object
  newJobSelect.vehicle.data = vehicles?.map((u) => ({
    vehicle_id: u.vehicle_id,
    vehicle_name:
      u.details.model + " " + u.details.brand + " " + u.details.plate,
  }));

  //update service info
  const updateService = async () => {
    const data = {
      service_name: updateInputs.service_name,
      service_image: updateInputs.service_image,
      service_description: updateInputs.service_description,
      service_price: updateInputs.service_price,
      service_discount: updateInputs.service_discount,
      service_category_id: updateSelects.service_category_id,
      service_id: service.service_id,
    };
    dispatch(updateServices(data)).then((data) => {
      if (data.payload.success) {
        dispatch(getServices());
        toast(data.payload.message);
        setOpen((prev) => ({ ...prev, openEdit: false }));
      } else {
        toast(data.payload.success);
        setOpen((prev) => ({ ...prev, openEdit: true }));
      }
    });
  };

  //client
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

        <div className=" flex justify-between p-2">
          {/* update a service */}
          {admin && (
            <div className="">
              <CustomSheet
                title={service.service_name}
                trigger={{ icon: SquarePen, name: "edit" }}
                initiator={"small"}
                fields={addValue(newServiceInputs, service)}
                selectFields={newServicesSelects}
                states={{
                  open: open.openEdit,
                  setOpen: (value) => {
                    setOpen((prev) => ({ ...prev, openEdit: value }));
                  },
                }}
                actions={{
                  onSubmit: updateService,
                  onFieldChange: setUpdateInputs,
                  onSelectChange: setUpdateSelects,
                }}
              />
            </div>
          )}

          {admin && (
            <Dialog
            // open={open.openDelete}
            // onOpenChange={(value) =>
            //   setOpen((prev) => ({ ...prev, openDelete: value }))
            // }
            >
              <DialogTrigger
                render={
                  <Button size="icon" variant="destructive">
                    <Trash />
                  </Button>
                }
              ></DialogTrigger>
              <DialogContent className={"bg-card"}>
                <DialogHeader>
                  <DialogTitle>{service.service_name}</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                  <p> Are you sure you want to remove the above service</p>
                </div>
                <Button onClick={() => deleteProduct()} variant="destructive">
                  delete
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
