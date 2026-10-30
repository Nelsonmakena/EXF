import RolesCard from "@/Comp/roleCard";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { newPosition, positionList } from "@/store/wokerslice";
import CustomSheet from "@/Comp/custom-sheet";
import { Plus } from "lucide-react";
import { EmployeePositionsInputs } from "@/utils/inputs";
export default function EmployeePositions() {
  const { positions } = useSelector((state) => state.worker);
  const [open, SetOPen] = useState(false);
  const dispatch = useDispatch();
  console.log(positions);

  const newPositionData = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata.entries());
    dispatch(newPosition(data)).then((results) => {
      if (results?.payload.success) {
        toast(results?.payload.message);
        SetOPen(false);
      }
      toast(results?.payload.message);
      SetOPen(true);
    });
  };

  useEffect(() => {
    dispatch(positionList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <div>
            <CustomSheet
              title={"new employee positions"}
              trigger={{ icon: Plus, name: "New Position" }}
              fields={EmployeePositionsInputs}
            />
          </div>
        </div>
        {positions.map((position) => (
          <RolesCard item={position} />
        ))}
      </div>
    </section>
  );
}
