import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "@/store/serviceslice";
import { getVehiclelist } from "@/store/vehicleslice";
import { Spinner } from "@/components/ui/spinner";

import ServiceCard from "../../Comp/ServiceCard";

export default function ClientServices() {
  const [jobData, setJobData] = useState({
    vehicle_id: "",
    appointment_day: "",
    service_id: "",
  });
  const { vehicles } = useSelector((state) => state.vehicle);
  const { availableServiceList } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //getting a new service
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
  useEffect(() => {
    dispatch(getServices());
    dispatch(getVehiclelist());
  }, []);

  return (
    <>
      <section className=" section-sm">
        <div className="grid grid-cols-2   md:flex md:flex-wrap  md:items-stretch  justify-center  gap-5  ">
          {availableServiceList.length == 0 ? (
            <div className="w-full h-screen flex items-center justify-center">
              <Spinner></Spinner>
            </div>
          ) : (
            availableServiceList.map((item) => (
              <ServiceCard
                key={item.service_id}
                vehicles={vehicles}
                service={item}
                client={true}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
