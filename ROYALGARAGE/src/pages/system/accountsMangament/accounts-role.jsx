import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountRoles,
  newAccountRole,
} from "./../../../store/accountsslice";
import RolesCard from "@/Comp/roleCard";
import { toast } from "sonner";
import CustomSheet from "@/Comp/custom-sheet";
import { Plus } from "lucide-react";
import { newAccountRoleInputs } from "@/utils/inputs";
export default function AccountsRoles() {
  const [open, SetOpen] = useState(false);
  const { accountRoles } = useSelector((state) => state.Accounts);
  const [inputs, setInputs] = useState({
    role_name: "",
    role_description: "",
  });
  const dispatch = useDispatch();

  const actions = {
    updateAccountRole: "updateAccountRole",
    removeAccountRole: "removeAccountRole",
  };

  useEffect(() => {
    dispatch(getAccountRoles());
  }, []);
  const newAccountRoleData = async () => {
    dispatch(newAccountRole(inputs)).then((result) => {
      if (result.payload.success) {
        setInputs({
          role_name: "",
          role_description: "",
        });
        toast(result.payload.message);
        SetOpen(false);
      } else {
        toast(result.payload.message);
        SetOpen(true);
      }
    });
  };
  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal card ">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <CustomSheet
            trigger={{ icon: Plus, name: "New account Role" }}
            fields={newAccountRoleInputs}
            states={{ open: open, setOpen: SetOpen }}
            actions={{ onFieldChange: setInputs, onsubmit: newAccountRoleData }}
          />
        </div>
        {accountRoles?.map((item) => (
          <RolesCard isSystem={true} item={item} actions={actions} />
        ))}
      </div>
    </section>
  );
}
