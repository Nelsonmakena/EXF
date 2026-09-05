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
import { Calendar1 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclelist } from "@/Comp/store/vehicleslice";

import { toast } from "sonner";
import { newJob } from "@/Comp/store/jobsslice";
import { currencyFormat } from "@/utils/utils";
export default function ServiceCard({ name, price, image, id, vehicles }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    vehicle_id: "",
    appointment_day: "",
    service_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(jobData);

  const newJobSubmission = async (e) => {
    e.preventDefault();

    dispatch(newJob(jobData)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        setOpen(false);
        jobData.appointment_day = "";
        jobData.vehicle_id = "";
      } else {
        toast(data.payload.message);
        setOpen(true);
      }
    });
  };

  return (
    <div className="bg-card  rounded-xl shadow-xs  flex flex-col  cursor-pointer md:w-48   hover:-translate-y-1 transition duration-400">
      {/* Product Image */}
      <div className="  w-full  flex items-center justify-center h-30 ">
        <img
          src={`/assets/images/${image}.jpg`}
          alt={name}
          className="max-h-full w-full rounded-t-xl  "
        />
      </div>
      <div className="flex flex-col gap-normal ">
        <div className="flex  px-2 py-3">
          <p className="text-sm text-primary cursor-pointer py-3 px-1  ">
            {name}
          </p>
        </div>
        <div className="inline-flex items-center justify-center">
          <h1 className="text-gray-500 inline-flex">Price</h1>
          <span className="text-sm font-semibold text-accent py-3 px-4">
            {currencyFormat(price)}
          </span>
        </div>

        {/* getting the service logic*/}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button
                onClick={() =>
                  setJobData((prev) => ({
                    ...prev,
                    service_id: id,
                  }))
                }
                className=" text-white rounded-b-xl  rounded-t-none  h-12   "
              >
                {" "}
                Book Now
              </Button>
            }
          ></DialogTrigger>
          <DialogContent className={"bg-card"}>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={newJobSubmission}>
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
                  onChange={handleChange}
                  value={jobData.appointment_day}
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
      </div>
    </div>
  );
}
