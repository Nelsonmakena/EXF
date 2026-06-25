import { useState } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/dodge.jpg";
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
import { ScrollArea } from "@base-ui/react/scroll-area";

export default function ClientServices() {
  const [ServicesList, SetServicesList] = useState([
    {
      ServiceName: "Clutch Replacement",
      VehicleRegistrationNumber: "KAY233",
    },
    {
      ServiceName: "Wheel Alignment",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Air Filter Replacement",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Wheel Alignment",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Air Filter Replacement",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Wheel Alignment",
      VehicleRegistrationNumber: "KAZ122",
    },
    {
      ServiceName: "Oil Change",
      VehicleRegistrationNumber: "KAZ122",
    },
    {
      ServiceName: "Tire Rotation",
      VehicleRegistrationNumber: "KAZ122",
    },
    {
      ServiceName: "Air Filter Replacement",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Wheel Alignment",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Windshield Replacement",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Transmission Repair",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Wheel Alignment",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Windshield Replacement",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Transmission Repair",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      ServiceName: "Battery Replacement",
      VehicleRegistrationNumber: "KAY233",
    },
    {
      ServiceName: "Brake Inspection",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Battery Replacement",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      ServiceName: "Fuel System Repair",
      VehicleRegistrationNumber: "KAY233",
    },
    {
      ServiceName: "Fuel System Repair",
      VehicleRegistrationNumber: "KDA227Z",
    },
    {
      ServiceName: "Air Conditioning Repair",
      VehicleRegistrationNumber: "KDA227Z",
    },
  ]);
  return (
    <>
      <section className="container-main">
        {/* get new service */}
        <div></div>
        <div className=" section   ">
          <h1 className="  heading-normal  text-green-700 ">
            {" "}
            Ongoing <span className="text-blue-500"> Services </span>{" "}
          </h1>
          <div className=" flex   bg-orange-700 w-2xs h-40   rounded-2xl shadow-lg md:w-4xl md:h-40 ">
            <div className="   flex flex-col  items-center  w-1/3 ">
              <div className="  h-1/2  flex items-center ">
                <h1 className="font-medium  text-white ">service name </h1>
              </div>
              <div className="   h-1/2 text-white ">
                <h1>Wheel allignment </h1>
              </div>
            </div>
            <div className="   flex flex-col  items-center  w-1/3 ">
              <div className="  h-1/2  flex items-center ">
                <h1 className="font-medium  text-white ">Amount </h1>
              </div>
              <div className="    h-1/2 text-white font-medium text-shadow-xs  ">
                <h1> 10,000/= </h1>
              </div>
            </div>
            <div className="   flex flex-col  items-center  w-1/3 ">
              <div className="p   h-1/2  flex items-center ">
                <h1 className="font-medium  text-white ">vehicle </h1>
              </div>
              <div class="flex    items-center gap-2 sm:gap-3 ">
                <img
                  src={dodge}
                  alt="Avatar"
                  class="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white sm:h-10 sm:w-10"
                />
                <div class="min-w-0">
                  <div class="text-white  ">KAY233Y</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**recent services table list */}
      <section className="container-main">
        <div className="section">
          <h1 className=" heading-normal   text-blue-500 ">
            {" "}
            Recent <span className="text-green-700"> Services </span>{" "}
          </h1>
          <Table>
            <TableCaption> Recent Services</TableCaption>
            <TableHeader>
              <TableRow className="text-header font-bold">
                <TableHead>Servie Name </TableHead>
                <TableHead> Car</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {ServicesList.map((item) => (
                <TableRow>
                  <TableCell className="font-medium">
                    {item.ServiceName}
                  </TableCell>
                  <TableCell>{item.VehicleRegistrationNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
