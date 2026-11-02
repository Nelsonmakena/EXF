import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "@/store/serviceslice";
import { getVehiclelist } from "@/store/vehicleslice";
import { Spinner } from "@/components/ui/spinner";

import ServiceCard from "../../Comp/ServiceCard";
import { newJobSelect } from "@/utils/inputs";

export default function ClientServices() {
  const [inputs, setInputs] = useState({
    appointment_day: "",
  });
  const [selects, setSelects] = useState({
    vehicle_id: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const { vehicles } = useSelector((state) => state.vehicle);
  const { availableServiceList } = useSelector((state) => state.services);
  const dispatch = useDispatch();

  //setting vehicle select object
  newJobSelect.vehicle.data = vehicles.map((u) => ({
    vehicle_id: u.vehicle_id,
    vehicle_name:
      u.details.model + " " + u.details.brand + " " + u.details.plate,
  }));

  //getting a new service
  const newJobSubmission = async (e) => {
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
                states={{
                  setInputs: setInputs,
                  setSelects: setSelects,
                  setSelectedItem: selectedItem,
                }}
                actions={{
                  newJob: newJobSubmission,
                }}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
