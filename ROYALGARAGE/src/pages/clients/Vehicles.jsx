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

import { Sidebar } from "@/components/ui/sidebar";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Loader from "@/Comp/loader";
import Alerts from "@/Comp/alerts";
import { CarIcon } from "lucide-react";

export default function Vehicles() {
  const [isloading, Setisloading] = useState(true);
  const [showAlert, SetshowAlert] = useState(false);
  const [alertMessage, Setalertmessage] = useState();
  const [Vehicle, SetVehicle] = useState([]);

  console.log(Vehicle);

  const token = localStorage.getItem("token");
  //fetch vehicles
  const fetchvehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/client/vehicle",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      SetVehicle(response.data.data);
      console.log(response.data.data);

      //Setisloading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addvehicle = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    const data = Object.fromEntries(formdata.entries());
    try {
      const add = await axios.post(
        "http://localhost:3000/api/client/addvehicle",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Setalertmessage(add.data.message);
      SetshowAlert(true);
      console.log(add.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchvehicles();
  }, []);
  setTimeout(() => {
    SetshowAlert(false);
  }, 1000);

  return (
    <>
      <section className="container-main">
        <div></div>
        {/** adding a new vehicle */}
        <div className=" card  flex justify-center items-center">
          <form
            onSubmit={addvehicle}
            className=" card  justify-between w-2xl  shadow-md rounded-2xl"
          >
            <div className="flex gap-3">
              <div className="grid gap-3 w-2xs h-20">
                <Input
                  name="liscence_plate"
                  placeholder="liscence_plate"
                  required
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
        </div>

        <div className="section">
          <h1 className="heading-normal font-bold text-header  flex justify-center ">
            {" "}
            My Cars
          </h1>
          <Table className="">
            <TableCaption> Registered Vehicles.</TableCaption>
            <TableHeader>
              <TableRow className="heading-normal font-bold ">
                <TableHead>Number Plate</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Color</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Vehicle.map((item) => (
                <TableRow key={item.vehicle_id}>
                  <TableCell className="flex items-center gap-2.5">
                    <div className="border w-10 h-10 flex justify-center items-center  rounded-full overflow-hidden ">
                      {" "}
                      <h1 className="text-header">{item.liscence_plate} </h1>
                      <h1 className="text-header-foreground">
                        {" "}
                        {item.liscence_plate}{" "}
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
        {showAlert && <Alerts alertMessage={alertMessage} />}
      </section>
    </>
  );
}
