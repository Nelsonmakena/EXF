import { useState } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/dodge.jpg";
import M100 from "../../Comp/M100";
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

import { ScrollArea } from "@/components/ui/scroll-area";
export default function Vehicles() {
  const [Vehicle, SetVehicle] = useState([
    {
      VehicleRegistrationNumber: "KAY233",
      CustomerID: 11,
      VehicleDetails: "suzuki",
      Color: "red",
      Chassis: "10023",
    },
    {
      VehicleRegistrationNumber: "KBZ127Y",
      CustomerID: 11,
      VehicleDetails: "mazda",
      Color: "black",
      Chassis: "10089",
    },
    {
      VehicleRegistrationNumber: "KBX222Y",
      CustomerID: 11,
      VehicleDetails: "TOYOTA",
      Color: "Black",
      Chassis: "12345",
    },
    {
      VehicleRegistrationNumber: "KBX224Y",
      CustomerID: 2,
      VehicleDetails: "Toyota",
      Color: "red",
      Chassis: "1008",
    },
    {
      VehicleRegistrationNumber: "KAT2209",
      CustomerID: 2,
      VehicleDetails: "suzuki",
      Color: "white",
      Chassis: "123333",
    },
    {
      VehicleRegistrationNumber: "KDA223Z",
      CustomerID: 3,
      VehicleDetails: "Nissan",
      Color: "black",
      Chassis: "12210W",
    },
    {
      VehicleRegistrationNumber: "KCD245A",
      CustomerID: 3,
      VehicleDetails: "Toyota Harrier",
      Color: "black",
      Chassis: "45610Q",
    },
    {
      VehicleRegistrationNumber: "KBZ229E",
      CustomerID: 4,
      VehicleDetails: "mercedes benz",
      Color: "yellow",
      Chassis: "456EW",
    },
    {
      VehicleRegistrationNumber: "KAZ122",
      CustomerID: 11,
      VehicleDetails: "Marchi",
      Color: "black",
      Chassis: "123456",
    },
  ]);
  const [ShowModal, SetShowModal] = useState(false);
  function Handledelete() {
    SetShowModal(true);
    console.log("hello");
  }

  return (
    <>
      <main>
        <section className="container-main">
          <div className="section">
            <h1 className="heading-normal text-header "> My Cars</h1>

            <Table className="">
              <TableCaption> Registered Vehicles.</TableCaption>
              <TableHeader>
                <TableRow className="text-header font-bold">
                  <TableHead>Number Plate</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Color</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Vehicle.map((item) => (
                  <TableRow>
                    <TableCell className="font-medium">
                      {item.VehicleRegistrationNumber}
                    </TableCell>
                    <TableCell>{item.VehicleDetails}</TableCell>
                    <TableCell>{item.Color}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
}
