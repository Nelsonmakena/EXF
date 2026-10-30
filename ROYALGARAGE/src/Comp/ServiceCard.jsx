import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Calendar1, SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "sonner";
import { newJob } from "@/store/jobsslice";
import { addValue, currencyFormat } from "@/utils/utils";

import { useNavigate } from "react-router";
import CustomSheet from "./custom-sheet";
import { newServiceInputs } from "@/utils/inputs";
export default function ServiceCard({
  vehicles,
  service,
  client,
  admin,
  actions,
}) {
  const { updateService, deleteService, setSelectedItem } = actions ?? {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button
                  onClick={() => {
                    vehicles.length > 0
                      ? setJobData((prev) => ({
                          ...prev,
                          service_id: service.service_id,
                        }))
                      : (toast("please add a vehicle to continue"),
                        navigate("/client/vehicles"));
                  }}
                  className=" text-white rounded-b-xl  rounded-t-none  h-12   "
                >
                  {" "}
                  Book Now
                </Button>
              }
            ></DialogTrigger>
            <DialogContent className={"bg-card"}>
              <DialogHeader>
                <DialogTitle>{service.service_name}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <form>
                <div className="flex flex-col w-full justify-center items-center   gap-normal">
                  <label htmlFor="select vehicle ">
                    {" "}
                    choose vehicle to be serviced
                  </label>
                  <Select
                    onValueChange={(plate) => {
                      const vehicle = vehicles.find(
                        (item) => item.details.plate === plate,
                      );
                      setJobData((prev) => ({
                        ...prev,
                        vehicle_id: vehicle.vehicle_id,
                      }));
                    }}
                    className=" border  shadow-2xl"
                  >
                    <SelectTrigger className="w-2xs shadow-2xl ">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent className="bg-none backdrop-blur-md">
                      {vehicles.map((item) => (
                        <SelectItem
                          className={"tracking-wide font-bold"}
                          name="vehicle_id"
                          key={item.details.plate}
                          value={item.details.plate}
                        >
                          {item.details.plate} {item.details.brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex w-full justify-between p-3.5">
                    {" "}
                    <h1> pick day of service </h1> <Calendar1 />{" "}
                  </div>

                  <Input
                    className={"p-3.5 w-2xs"}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    name="appointment_day"
                    // onChange={handleChange}
                    // value={jobData.appointment_day}
                    required
                  />
                  <button
                    type="submit"
                    className="w-2xs h-12 text-white rounded-md   bg-primary"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
        {admin && (
          <div className="">
            {" "}
            <CustomSheet
              title={service.service_name}
              trigger={{ icon: SquarePen, name: "edit" }}
              fields={addValue(newServiceInputs, service)}
              actions={{ onSubmit: updateService }}
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
