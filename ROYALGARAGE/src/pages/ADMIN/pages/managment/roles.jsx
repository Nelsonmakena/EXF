import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";
import { deleteRole, getRoleList, newRole } from "@/store/wokerslice";
import { Trash, Trash2 } from "lucide-react";
import RolesCard from "@/Comp/roleCard";

export default function RolesView() {
  const [open, SetOPen] = useState(false);
  const { roles } = useSelector((state) => state.worker);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  return (
    <section className="section-sm">
      <div className="grid grid-cols-3 gap-normal card ">
        {roles.map((role) => (
          <RolesCard item={role} isAdmin={true} />
        ))}
      </div>
    </section>
  );
}
