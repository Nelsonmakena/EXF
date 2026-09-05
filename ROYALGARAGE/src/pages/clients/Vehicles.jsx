import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  CarFront,
  Cog,
  CircleX,
  CalendarDays,
  Clock3,
  Ellipsis,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehiclelist,
  newVehicle,
  removeVehicle,
} from "@/Comp/store/vehicleslice";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function Vehicles() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => state.vehicle);
  const [open, setOpen] = useState(false);

  const addVehicle = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    dispatch(newVehicle(data)).then((data) => {
      if (data.payload.success) {
        setOpen(false);
        toast(data.payload.message);
      } else {
        setOpen(true);
        toast.warning(data.payload.message);
      }
    });
  };

  // const deleteVehicle
  useEffect(() => {
    dispatch(getVehiclelist());
  }, []);
  console.log(vehicles);

  return (
    <>
      <section className="container-main">
        <div className=" bg-card rounded-md shadow-md py-4">
          <Table className="">
            <TableCaption>
              {/* adding a new vehicle  */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger
                  render={
                    <button className=" flex justify-center items-center border gap-normal py-2 px-3.5 rounded-md">
                      <CarFront className="text-accent" />
                      <h1 className="text-body text-header"> New Vehicle</h1>
                    </button>
                  }
                ></DialogTrigger>
                <DialogContent className={" bg-card"}>
                  <DialogHeader>
                    <DialogTitle> Add Vehicle</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={addVehicle}
                    className=" flex flex-col card  justify-center items-center  w-full"
                  >
                    <div className="flex flex-col  gap-normal">
                      <div className="grid gap-3 w-2xs h-20">
                        <Input
                          name="license_plate"
                          placeholder="license_plate"
                          required
                          maxlength={7}
                        />
                        <Input
                          name="vehicle_model"
                          placeholder="vehicle_model"
                          required
                        />
                      </div>
                      <div className="grid gap-3 w-2xs">
                        <Input
                          name="vehicle_brand"
                          placeholder="vehicle_brand"
                          required
                        />
                        <Input
                          name="vehicle_color"
                          placeholder="vehicle_color"
                          required
                        />
                      </div>
                    </div>
                    <div className=" card w-full flex justify-center ">
                      <button
                        type="submit"
                        className="w-2xs h-12 text-white rounded-md   bg-primary"
                      >
                        Add Vehicle
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </TableCaption>
            {/* list of vehicles  */}
            <TableHeader>
              <TableRow className="font-bold">
                <TableHead
                  className={"font-bold text-secondary tracking-widest"}
                >
                  Vehicle
                </TableHead>
                <TableHead className={"font-bold text-primary tracking-widest"}>
                  Appointment
                </TableHead>
                <TableHead
                  className={"font-bold text-secondary tracking-widest"}
                >
                  Services
                </TableHead>

                <TableHead className={"font-bold text-primary"}></TableHead>
                <TableHead className={"font-bold text-primary"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((item) => (
                <>
                  <TableRow
                    key={item.vehicle_id}
                    className="group cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/20">
                          {item.details.plate[0]}
                          {item.details.plate[6]}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.details.plate}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {item.details.model} {item.details.brand}
                            <span className="mx-1.5">•</span>
                            {item.details.color}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TableCell>
                        <div
                          className={` ${!item.appointment_day ? "hidden" : "flex items-center gap-2"}`}
                        >
                          <CalendarDays size={16} className="text-gray-400" />

                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {item.appointment_day}
                            </p>

                            <p className="text-xs text-gray-400">Appointment</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`${item.services.length == 0 ? "hidden" : "inline-flex border items-center gap-2 rounded-lg bg-gray-50 px-3 py-2"} `}
                      >
                        <Clock3 size={15} className="text-gray-400" />

                        <span className="text-sm font-medium text-gray-700">
                          {item.services.length}
                        </span>

                        <span className="text-xs text-gray-500">
                          {item.services.length === 1
                            ? "Service"
                            : "Services" + " " + "in progress"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center">
                        <DropdownMenu className="">
                          <DropdownMenuTrigger>
                            <Ellipsis />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className={"bg-none backdrop-blur-md min-w-40 "}
                          >
                            <DropdownMenuItem className={""}>
                              <Button
                                variant="outline"
                                className={"w-full"}
                                onClick={() => setOpenUpdate(true)}
                              >
                                update
                              </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Button
                                variant="destructive"
                                className=" inline-flex px-4 w-full"
                                onClick={() => setOpenDelete(true)}
                              >
                                Delete
                              </Button>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
                    <DialogContent className={" bg-card backdrop-blur-md"}>
                      <DialogHeader>
                        <DialogTitle className={"flex justify-center"}>
                          {item.license_plate}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <h1 className=" w-full flex justify-center">
                        Are you sure you want to remove this vehicle
                      </h1>
                      <div className="p-3.5">
                        This action cannot be undone. This will permanently
                        delete your vehicle and remove its data from our
                        servers.
                      </div>
                      <div className="w-full flex items-center justify-between h-36">
                        <Button
                          className={"w-40"}
                          onClick={async () => {
                            dispatch(removeVehicle(item.vehicle_id)).then(
                              (data) => {
                                data.payload.success
                                  ? toast(data.payload.message)
                                  : toast(data.payload.message);
                              },
                            );
                          }}
                        >
                          Confirm
                        </Button>
                        <DialogClose asChild>
                          <Button variant="destructive" className={"w-40"}>
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogContent className={" bg-card backdrop-blur-md"}>
                      <DialogHeader>
                        <DialogTitle className={"flex justify-center"}>
                          {item.license_plate}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <h1 className=" w-full flex justify-center">
                        Are you sure you want to remove this vehicle
                      </h1>
                      <div className="p-3.5">
                        This action cannot be undone. This will permanently
                        delete your vehicle and remove its data from our
                        servers.
                      </div>
                      <div className="w-full flex items-center justify-between h-36">
                        <Button
                          className={"w-40"}
                          onClick={async () => {
                            dispatch(removeVehicle(item.vehicle_id)).then(
                              (data) => {
                                data.payload.success
                                  ? toast(data.payload.message)
                                  : toast(data.payload.message);
                              },
                            );
                          }}
                        >
                          Confirm
                        </Button>
                        <DialogClose asChild>
                          <Button variant="destructive" className={"w-40"}>
                            Cancel
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {/** adding a new vehicle */}
        <div className=" card  flex justify-center items-center"></div>
      </section>
    </>
  );
}
