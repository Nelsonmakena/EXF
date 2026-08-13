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
import { newJob } from "@/Comp/store/serviceslice";
import { toast } from "sonner";
export default function ServiceCard({ name, price, image, id, vehicles }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [jobData, setJobData] = useState({
    vehicle_id: "",
    appointemnt_day: "",
    service_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const newJobSubmission = async (e) => {
    e.preventDefault();

    dispatch(newJob(jobData)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
        setOpen(false);
        jobData.appointemnt_day = "";
        jobData.vehicle_id = "";
      } else {
        toast(data.payload.message);
        setOpen(true);
      }
    });
  };

  return (
    <div className="border-border  rounded-xl  flex flex-col w-46  shadow-md hover:-translate-y-1 transition duration-400">
      {/* Product Image */}
      <div className="flex items-center justify-center h-30 mb-2 ">
        <img
          src={`/assets/images/${image}.jpg`}
          alt={name}
          className="max-h-full w-full rounded-t-xl  "
        />
      </div>

      {/* Product Name */}
      <p className="text-sm text-neutral-500 mb-2 px-2 cursor-pointer">
        {name}
      </p>

      {/* Price */}
      <div className="flex items-center gap-2 px-2">
        <span className="text-sm font-semibold text-neutral-800">
          ksh {Number(price)}
        </span>
      </div>

      {/* getting the service logic*/}
      <div className=" w-3/4 m-2.5 flex items-center justify-center  h-12 ">
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
                className=" text-white rounded-md  shadow-md h-10   "
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
                  onValueChange={(licensePlate) => {
                    const vehicle = vehicles.find(
                      (item) => item.liscence_plate === licensePlate,
                    );
                    setJobData((prev) => ({
                      ...prev,
                      vehicle_id: vehicle.vehicle_id,
                    }));
                  }}
                  className=" border w-2xs shadow-2xl"
                >
                  <SelectTrigger className="w-2xs shadow-2xl ">
                    <SelectValue placeholder="Select vehicle" />
                  </SelectTrigger>
                  <SelectContent className="bg-none backdrop-blur-md">
                    {vehicles.map((item) => (
                      <SelectItem
                        className={"tracking-wide font-bold"}
                        name="vehicle_id"
                        key={item.liscence_plate}
                        value={item.liscence_plate}
                      >
                        {item.liscence_plate} {item.vehicle_brand}
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
                  name="appointemnt_day"
                  onChange={handleChange}
                  value={jobData.appointemnt_day}
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
