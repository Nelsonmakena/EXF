import RolesCard from "@/Comp/roleCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { newRole, getRoleList } from "@/store/accountsslice";
import CustomSheet from "@/Comp/custom-sheet";
import { Plus } from "lucide-react";
import { newEmployeeRoleInputs } from "@/utils/inputs";
export default function EmployeeRoles() {
  const [open, SetOPen] = useState(false);
  const [inputs, setInputs] = useState({
    role_name: "",
    role_description: "",
  });
  const dispatch = useDispatch();
  const { employeeRoles } = useSelector((state) => state.Accounts);
  const actions = {
    removeEmployeeRole: "removeEmployeeRole",
    updateEmployeeRole: "updateEmployeeRole",
  };
  const newRoleData = async () => {
    dispatch(newRole(inputs)).then((data) => {
      if (data.payload.success) {
        setInputs({
          role_name: "",
          role_description: "",
        });
        toast(data.payload.message);
        SetOPen(false);
        dispatch(getRoleList());
      } else {
        toast(data.payload.message);
        SetOPen(true);
      }
    });
  };

  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <div className="w-30">
            <CustomSheet
              trigger={{ icon: Plus, name: "New Role" }}
              fields={newEmployeeRoleInputs}
              actions={{ onFieldChange: setInputs, onSubmit: newRoleData }}
            />
          </div>
        </div>
        {employeeRoles.map((role) => (
          <RolesCard item={role} isSystem={true} actions={actions} />
        ))}
      </div>
    </section>
  );
}
