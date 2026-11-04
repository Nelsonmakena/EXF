import { AvatarFormatter, SingleAvatarFormatter } from "@/utils/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getIncomingVehicles } from "@/store/assessmentSlice";
import { useNavigate } from "react-router";
export default function Vehicle() {
  const { vehicleList } = useSelector((state) => state.assessments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIncomingVehicles());
  }, []);
  console.log(vehicleList);
  if (vehicleList.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="tracking-widest font-bold ">
          no incoming vehicles at the moment{" "}
        </h1>
      </div>
    );
  }
  return (
    <section className="section-sm ">
      <div className="grid grid-cols-1 gap-4">
        {vehicleList.map((vehicle) => {
          return (
            <Card className="group w-2xl cursor-pointer rounded-xl p-4 transition ">
              <div className="flex items-center gap-4 px-3 ">
                {/* avartar  */}
                <div className="flex h-11 w-11  shrink-0 items-center justify-center rounded-lg bg-muted">
                  {SingleAvatarFormatter(vehicle.license_plate, "plate")}
                </div>

                {/* vehicle details */}
                <div className="min-w-0 flex-1 justify-center">
                  <p className="truncate font-medium">
                    {vehicle.vehicle_model}
                  </p>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {vehicle.license_plate}
                  </p>
                </div>

                {/* Value */}
                <div className="hidden w-28 lg:block">
                  <p className="text-xs text-muted-foreground"></p>

                  <p className="mt-1 font-semibold">
                    {vehicle.appointment_day}
                  </p>
                </div>
                <div>
                  <Button
                    onClick={() =>
                      navigate(`/assessment/vehicle/${vehicle.garage_id}`)
                    }
                  >
                    {" "}
                    confirm
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
