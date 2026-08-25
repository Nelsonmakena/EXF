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
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CarFront, Cog, CircleX } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVehiclelist,
  newVehicle,
  removeVehicle,
} from "@/Comp/store/vehicleslice";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function Vehicles() {
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => state.vehicle);
  console.log(vehicles);

  const addVehicle = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);

    dispatch(newVehicle(data)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
      } else {
        toast.warning(data.payload.message);
      }
    });
  };

  // const deleteVehicle
  useEffect(() => {
    dispatch(getVehiclelist());
  }, []);

  return (
    <>
      <section className="container-main">
        <div className="section">
          <h1 className="heading-normal font-bold text-header  flex justify-center ">
            {" "}
            My Cars
          </h1>
          <Table className="">
            <TableCaption>
              {/* adding a new vehicle  */}
              <Dialog>
                <DialogTrigger
                  render={
                    <button className="w-2xs flex flex-row items-center gap-normal">
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
                          name="liscence_plate"
                          placeholder="liscence_plate"
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
                <TableHead className={"font-bold text-secondary"}>
                  Number Plate
                </TableHead>
                <TableHead className={"font-bold text-primary"}>
                  Model
                </TableHead>
                <TableHead className={"font-bold text-secondary"}>
                  Brand
                </TableHead>
                <TableHead className={"font-bold text-primary"}>
                  Color
                </TableHead>
                <TableHead className={"font-bold text-primary"}></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((item) => (
                <TableRow key={item.vehicle_id}>
                  <TableCell className="flex items-center gap-2.5">
                    <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                      {" "}
                      <h1 className="text-header font-bold">
                        {vehicles.length == 0 ? (
                          <Spinner></Spinner>
                        ) : (
                          item.liscence_plate[0]
                        )}{" "}
                      </h1>
                      <h1 className="text-header-foreground">
                        {" "}
                        {item.liscence_plate[6]}{" "}
                      </h1>
                    </div>
                    {item.liscence_plate}
                  </TableCell>
                  <TableCell>{item.vehicle_model}</TableCell>
                  <TableCell>{item.vehicle_brand}</TableCell>
                  <TableCell>{item.vehicle_color}</TableCell>
                  {/* edit a row   */}
                  <TableCell className={"flex justify-between  "}>
                    <Dialog>
                      <DialogTrigger
                        render={<Cog className="text-accent" />}
                      ></DialogTrigger>
                      <DialogContent className={" bg-card backdrop-blur-md"}>
                        <DialogHeader>
                          <DialogTitle className={"flex justify-center"}>
                            {item.liscence_plate}
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
                    <Dialog>
                      <DialogTrigger
                        render={<CircleX className="text-destructive" />}
                      ></DialogTrigger>
                      <DialogContent className={" bg-card backdrop-blur-md"}>
                        <DialogHeader>
                          <DialogTitle className={"flex justify-center"}>
                            {item.liscence_plate}
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
                  </TableCell>
                </TableRow>
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
