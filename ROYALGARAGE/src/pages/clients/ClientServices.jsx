import { useState, useEffect } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/dodge.jpg";
import { XIcon } from "lucide-react";
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
import buttonanimation from "/src/assets/addbuttondata.json";
import Lottie from "lottie-react";
import ProductServiceList from "./ProductsServiceList";

export default function ClientServices() {
  const [NewServiceTab, SetNewServiceTab] = useState(false);
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

  {
    /**locks scroll to the area of the new tab  */
  }
  useEffect(() => {
    if (NewServiceTab) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [NewServiceTab]);
  return (
    <>
      <section className="container-main ">
        <div className="section">
          {/* get new service */}
          <div className="bg-card w-46 card  rounded-xl shadow-md">
            <div className=" card ">
              <Lottie animationData={buttonanimation} />
            </div>
            <button
              onClick={() => {
                SetNewServiceTab(!NewServiceTab);
                console.log(NewServiceTab);
              }}
              className="w-full h-12 text-white rounded-md   bg-primary"
            >
              {" "}
              New Service
            </button>
          </div>
          <div className=" section   ">
            <h1 className="  heading-normal  text-green-700 ">
              {" "}
              Ongoing <span className="text-blue-500"> Services </span>{" "}
            </h1>

            {/**service card  progress for ongoing services  */}
            <div className=" grid   heading-normal card   bg-cardbg  w-full md:h-40   rounded-2xl shadow-2xl md:w-4xl  gap-normal md:grid-cols-3 ">
              {/**col-1 */}
              <div className="flex  md:flex-col justify-between card">
                <h1 className=" text-primary-foreground">Service name </h1>
                <h1>Wheel allignment </h1>
              </div>

              {/**col-2 */}
              <div className="flex md:flex-col justify-between card">
                <h1 className="text-primary-foreground">Amount </h1>
                <h1> 10,000/= </h1>
              </div>
              {/**col-3 */}
              <div className="flex md:flex-col justify-between card">
                <h1 className="text-primary-foreground">Vehicle </h1>

                <div className="flex  items-center gap-1.5">
                  <img
                    src={dodge}
                    alt="Avatar"
                    class="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-white sm:h-10 sm:w-10"
                  />

                  <h1> KAY233Y</h1>
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
      {/** floating serive list */}

      {NewServiceTab && (
        <div>
          <div className=" w-full absolute top-15 z-50 p-3.5 flex justify-end ">
            <XIcon
              onClick={() => {
                SetNewServiceTab(!NewServiceTab);
              }}
            />
          </div>

          <ProductServiceList />
        </div>
      )}
    </>
  );
}
