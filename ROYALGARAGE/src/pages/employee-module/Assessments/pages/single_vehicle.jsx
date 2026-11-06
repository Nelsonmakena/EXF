import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  confirmVehicle,
  getSingleAssessmentItem,
} from "@/store/assessmentSlice";
import { AvatarFormatter, SingleAvatarFormatter } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SingleVehicle() {
  const { garageSlot } = useSelector((state) => state.assessments);

  const { garage_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirm = () => {
    dispatch(confirmVehicle(garageSlot)).then((results) => {
      if (results?.payload?.success) {
        toast(results.payload.message);
        navigate("/assessment/vehicle");
      } else {
        toast(results?.payload?.message);
      }
    });
  };

  useEffect(() => {
    dispatch(getSingleAssessmentItem(garage_id));
  }, []);

  if (!garageSlot) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1>item information not ~available at the moment </h1>
      </div>
    );
  }

  return (
    <section className="section-sm   ">
      <div className="grid grid-col-1 md:grid-cols-2 bg-card  ">
        <div className="rounded-2xl flex-1  p-5  sm:p-6">
          <div className="mb-5">
            <div className="flex items-center justify-center">
              <h2 className="font-semibold tracking-widest  ">Services</h2>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Services included in this vehicle
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {garageSlot?.services?.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between gap-3 py-3  cursor-pointer"
              >
                <div className="w-full flex  justify-between px-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ">
                    <img
                      src={`/assets/images/${service.service_image}.jpg`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h1 className="text-xs">{service.service_name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl flex-1  p-5  sm:p-6">
          <div className="rounded-2xl  p-5  sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <h1>
                  {SingleAvatarFormatter(
                    garageSlot?.vehicle?.vehicle_plate,
                    "plate",
                  )}
                </h1>
              </div>

              <div>
                <h2 className="font-semibold ">Vehicle</h2>
                <p className="text-xs text-gray-500">Vehicle information</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg "></div>

                <div>
                  <p className="text-xs text-gray-500">Vehicle</p>
                  <p className="mt-0.5 text-sm font-medium ">
                    {garageSlot?.vehicle?.model}
                  </p>
                  <p className="text-xs text-gray-500 tracking-widest">
                    {garageSlot?.vehicle?.color}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"></div>

                <div>
                  <p className="text-xs text-gray-500">Registration</p>
                  <p className="mt-0.5 text-sm font-medium">
                    {garageSlot?.vehicle?.vehicle_plate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center bg-card">
        <div className="rounded-2xl flex-1   p-5  sm:p-6 max-w-2xl ">
          <div className="mb-7 flex items-center justify-center tracking-wider">
            <h2 className="text-lg  ">client info</h2>
          </div>

          <div className="rounded-2xl   p-5  sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                <h1 className="text-primary font-bold">
                  {AvatarFormatter(garageSlot?.client?.firstName, "U")}
                </h1>
                <h1 className="text-secondary font-bold">
                  {AvatarFormatter(garageSlot?.client?.lastName, "U")}
                </h1>
              </div>

              <div>
                <p className="text-xs text-gray-500 tracking-widest">
                  {garageSlot?.client?.firstName}
                  {` ${AvatarFormatter(garageSlot?.client?.second_name)} ${"."}`}
                  {garageSlot?.client?.lastName}
                </p>
              </div>
            </div>

            <div className="flex w-full item-center justify-center">
              <h1 className="text-xs text-gray-500">phone number </h1>
              <p>{garageSlot?.client?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center h-30 ">
        <Button size="lg" className={"w-2xs h-12"} onClick={confirm}>
          Confirm
        </Button>
      </div>
    </section>
  );
}
