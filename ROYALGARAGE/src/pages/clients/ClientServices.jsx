import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "@/store/serviceslice";
import { getVehiclelist } from "@/store/vehicleslice";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

import ServiceCard from "../../Comp/ServiceCard";
import { newJobSelect } from "@/utils/inputs";
import { newJob } from "@/store/jobsslice";

export default function ClientServices() {
  const { vehicles } = useSelector((state) => state.vehicle);
  const { availableServiceList } = useSelector((state) => state.services);
  const [inputs, setInputs] = useState({
    appointment_day: "",
  });
  const [selects, setSelects] = useState({
    vehicle_id: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const newJobSuccess = false;

  const dispatch = useDispatch();

  //setting vehicle select object
  newJobSelect.vehicle.data = vehicles.map((u) => ({
    vehicle_id: u.vehicle_id,
    vehicle_name:
      u.details.model + " " + u.details.brand + " " + u.details.plate,
  }));

  //getting a new service
  const newJobSubmission = async () => {
    const data = {
      appointment_day: inputs.appointment_day,
      service_id: selectedItem,
      vehicle_id: selects.vehicle_id,
    };
    console.log(data);

    dispatch(newJob(data)).then((results) => {
      if (results.payload.success) {
        toast(results.payload.message);
        return (newJobSuccess = true);
      } else {
        toast(results.payload.message);
        return (newJobSuccess = false);
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
                  setSelectedItem: setSelectedItem,
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
