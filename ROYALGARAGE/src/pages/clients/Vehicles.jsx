import { useContext, useEffect, useState } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/images/dodge.jpg";

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Loader from "@/Comp/loader";
import Alerts from "@/Comp/alerts";
import { CarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclelist, newVehicle } from "@/Comp/store/vehicleslice";
import { toast } from "sonner";

export default function Vehicles() {
  const dispatch = useDispatch();
  const { vehicles } = useSelector((state) => state.vehicle);
  console.log(vehicles);

  const addvehicle = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());

    dispatch(newVehicle(data)).then((data) => {
      if (data.payload.success) {
        toast(data.payload.message);
      } else {
        toast.warning(data.payload.message);
      }
    });
  };
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
              {" "}
              <Sheet>
                <SheetTrigger
                  render={
                    <button className="w-full h-full">
                      <h1 className="text-body text-header"> New Vehicle</h1>
                    </button>
                  }
                />
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle className={"text-header heading-normal"}>
                      {" "}
                      Add Vehicle{" "}
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>

                  <form
                    onSubmit={addvehicle}
                    className=" flex flex-col card  justify-center items-center  w-full"
                  >
                    <div className="flex flex-col md:flex-row gap-normal">
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
                  <SheetFooter className="flex justify-center items-center">
                    <SheetClose
                      render={
                        <Button
                          className="w-2xs flex items-center justify-center"
                          variant="destructive"
                        >
                          Close
                        </Button>
                      }
                    />
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </TableCaption>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((item) => (
                <TableRow key={item.vehicle_id}>
                  <TableCell className="flex items-center gap-2.5">
                    <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                      {" "}
                      <h1 className="text-header font-bold">
                        {item.liscence_plate[0]}{" "}
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
