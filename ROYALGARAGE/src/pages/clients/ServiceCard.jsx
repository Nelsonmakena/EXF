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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Calendar1, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import "react-lazy-load-image-component/src/effects/blur.css";
import { toast } from "sonner";
import { newJob } from "@/Comp/store/jobsslice";
import { currencyFormat } from "@/utils/utils";
import {
  deletService,
  getServices,
  updateServices,
} from "@/Comp/store/serviceslice";
export default function ServiceCard({ vehicles, service, client, admin }) {
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
  //update service info
  const update_service = async (e, item) => {
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
    <div className="bg-card  rounded-xl shadow-xs  flex flex-col  cursor-pointer md:w-48   hover:-translate-y-1 transition duration-400">
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
                  onClick={() =>
                    setJobData((prev) => ({
                      ...prev,
                      service_id: service.service_id,
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
                <DialogTitle>{service.service_name}</DialogTitle>
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
        )}
        {admin && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  className={" text-white rounded-b-xl  rounded-t-none  h-12"}
                >
                  Edit
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"text-header heading-normal"}>
                  {service.service_name}
                </SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>

              <form
                onSubmit={(e) => {
                  update_service(e, service);
                }}
              >
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <label> Service name </label>
                    <Input
                      name="service_name"
                      defaultValue={service.service_name}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Service image </label>
                    <Input
                      name="service_image"
                      defaultValue={service.service_image}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Service descrption </label>
                    <Input
                      name="service_description"
                      defaultValue={service.service_description}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> service price </label>
                    <Input
                      name="service_price"
                      defaultValue={service.service_price}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Category </label>
                    <Input
                      name="service_category"
                      defaultValue={service.service_category}
                    />
                  </div>
                  <div className="grid gap-3">
                    <label> Discount </label>
                    <Input
                      name="service_discount"
                      defaultValue={service.service_discount}
                    />
                  </div>
                </div>
                <div className="card flex flex-col gap-2.5 justify-center">
                  <Button type="submit" className="  w-full h-11">
                    {" "}
                    update{" "}
                  </Button>
                </div>
              </form>
              <SheetFooter>
                <Button
                  variant="destructive"
                  className={"h-12"}
                  onClick={() => {
                    dispatch(deletService(service.service_id)).then((data) => {
                      if (data?.payload?.success) {
                        toast(data.payload.message);
                        dispatch(getServices());
                        setOpen(false);
                      } else {
                        toast(data.payload.message);
                        setOpen(true);
                      }
                    });
                  }}
                >
                  {" "}
                  <Trash />
                  remove
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}
