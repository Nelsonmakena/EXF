import CustomSheet from "@/Comp/custom-sheet";
import RolesCard from "@/Comp/roleCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServiceCategories, newServiceCategory } from "@/store/serviceslice";
import { editCategoryInputs, newServiceCategoryInputs } from "@/utils/inputs";
import { AvatarFormatter } from "@/utils/utils";
import { ArrowRight, Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ServiceCategories() {
  const dispatch = useDispatch();
  const { serviceCategories } = useSelector((state) => state.services);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });

  const newService = () => {
    dispatch(newServiceCategory(inputs)).then((results) => {
      if (results?.payload?.success) {
        toast(results.payload.message);
        dispatch(getServiceCategories());
      } else {
        toast(results.payload.message);
      }
    });
  };

  useEffect(() => {
    dispatch(getServiceCategories());
  }, []);

  return (
    <section className="section-sm flex flex-col gap-normal">
      <div className="grid grid-cols-3 gap-normal card ">
        <div className="w-2xs flex items-center justify-center ">
          <CustomSheet
            trigger={{ name: "new service category", icon: Plus }}
            actions={{ onFieldChange: setInputs, onSubmit: newService }}
            fields={newServiceCategoryInputs}
            states={{ open: open, setOpen: setOpen }}
          />
        </div>
        {serviceCategories?.map((item) => (
          <RolesCard isSystem={true} item={item} />
        ))}
      </div>
    </section>
  );
}
