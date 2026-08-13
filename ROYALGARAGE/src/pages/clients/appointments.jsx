import { useEffect, useState } from "react";
import ClientNav from "./ClientNav";
import dodge from "/src/assets/images/dodge.jpg";
import { Calendar } from "@/components/ui/calendar";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDatesClient } from "../../Comp/store/appointmentsdates";
import { Card, CardTitle } from "@/components/ui/card";
import Service from "./../Common/Services";

export default function Appointment() {
  const { dates } = useSelector((state) => state.appoitnmentDates);
  const [selectedDate, setSelectedDate] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentDatesClient());
  }, []);

  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  const selectedAppointments = dates.filter(
    (date) => date.appointment_day === selectedDateString,
  );

  return (
    <>
      <section className="container-main flex  flex-col w-full md:flex-row">
        <div className="flex flex-col section gap-normal  md:flex-1 ">
          <div className="flex justify-center card ">
            <p>{selectedDate?.toString().split(" ").slice(0, 4).join(" ")}</p>
          </div>
          {dates
            .filter((date) => date.appointment_day === selectedDateString)
            .map((date) => (
              <div className="w-full h-20  rounded-md  shadow-md  card bg-accent/20">
                <div className="flex  justify-between  items-center ">
                  <h1>{date.service_name}</h1> <h1>{date.liscence_plate}</h1>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center section md:flex-1  ">
          <Calendar
            mode="single"
            className={"w-2xs"}
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              booked: dates.map((date) => new Date(date.appointment_day)),
            }}
            modifiersClassNames={{
              booked: "bg-accent",
            }}
          />
        </div>
      </section>
    </>
  );
}
