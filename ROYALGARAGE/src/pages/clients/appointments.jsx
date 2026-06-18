import { useState } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/dodge.jpg";
import { Calendar } from "@/components/ui/calendar";

export default function Appointment() {
  const [appointementsdta, Setappointementsdta] = useState([
    {
      DateOfAppointment: "2024-04-3",
      TimeOfAppointment: "12-00",

      status: "Postponed",
      VehicleRegistrationNumber: "KAY233",
    },
    {
      DateOfAppointment: "2024-03-12",
      TimeOfAppointment: "14-14-00",

      status: "Awaiting",
      VehicleRegistrationNumber: "KBZ127Y",
    },
    {
      DateOfAppointment: "2024-05-02",
      TimeOfAppointment: "12-00",

      status: "Awaiting",
      VehicleRegistrationNumber: "KBX22Y",
    },
    {
      DateOfAppointment: "2024-05-03",
      TimeOfAppointment: "10-00",

      status: "Awaiting",
      VehicleRegistrationNumber: "KAY233",
    },
    {
      DateOfAppointment: "2024-02-20",
      TimeOfAppointment: "2pm",

      status: "Awaiting",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      DateOfAppointment: "2024-12-10",
      TimeOfAppointment: "10-00",

      status: "Awaiting",
      VehicleRegistrationNumber: "KDC123T",
    },
    {
      DateOfAppointment: "2024-12-05",
      TimeOfAppointment: "8 am ",

      status: "Awaiting",
      VehicleRegistrationNumber: "KDA277Z",
    },
    {
      DateOfAppointment: "2024-05-02",
      TimeOfAppointment: "03-00",

      status: "Awaiting",
      VehicleRegistrationNumber: "KAZ122",
    },
    {
      DateOfAppointment: "2023-2-12",
      TimeOfAppointment: "2pm",

      status: "Awaiting",
      VehicleRegistrationNumber: "KAY22",
    },
    {
      DateOfAppointment: "2024-03-20",
      TimeOfAppointment: "5pm",

      status: "Awaiting",
      VehicleRegistrationNumber: "KBX224Y",
    },
  ]);
  return (
    <>
      <title>Appointmets</title>

      <section className="container-main">
        <div className=" section  border">
          <Calendar className={"w-2xs"} />
        </div>
      </section>
    </>
  );
}
