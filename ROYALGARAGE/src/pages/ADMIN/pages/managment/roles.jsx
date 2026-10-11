import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { deleteRole, getRoleList } from "@/store/accountsslice";
import { Trash, Trash2 } from "lucide-react";
import RolesCard from "@/Comp/roleCard";

export default function RolesView() {
  const [open, SetOPen] = useState(false);
  const { employeeRoles } = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal card ">
        {employeeRoles.map((role) => (
          <RolesCard item={role} isAdmin={true} />
        ))}
      </div>
    </section>
  );
}
