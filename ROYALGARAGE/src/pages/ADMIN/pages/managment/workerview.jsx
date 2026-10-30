import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addNewWorker, getWorkerList, positionList } from "@/store/wokerslice";
import { toast } from "sonner";
import EmployeeCard from "./employeeCard";
import { Search, User } from "lucide-react";
import { getAccountRoles, getRoleList } from "@/store/accountsslice";
import { convertArray } from "@/utils/utils";
import CustomSheet from "@/Comp/custom-sheet";
import { newWorkerInputs, newWorkerSelects } from "@/utils/inputs";

export default function WorkerView() {
  const [id, setId] = useState({
    account_role_id: "",
    role_id: "",
    position_id: "",
  });
  const [input, setInput] = useState({
    email: "",
  });
  const {
    worker: { workerList, positions },
    Accounts: { employeeRoles, accountRoles },
  } = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (workerList.length == 0) {
      dispatch(getWorkerList());
    }
    dispatch(getRoleList());
    dispatch(getAccountRoles());
    dispatch(positionList());
  }, []);
  //setters
  newWorkerSelects.account.data = accountRoles;
  newWorkerSelects.position.data = positions;
  newWorkerSelects.role.data = employeeRoles;

  //add a new employee
  const addWorker = async () => {
    const data = {
      email: input.email,
      role_id: id.role_id,
      position_id: id.position_id,
      account_role_id: id.account_role_id,
    };
    dispatch(addNewWorker(data)).then((results) => {
      if (results?.payload?.success) {
        setId({
          account_role_id: "",
          role_id: "",
          position_id: "",
        });

        setInput({
          email: "",
        });
        toast(results?.payload?.message, { position: "top-left" });
        dispatch(getWorkerList());
        setOpen(false);
      } else {
        toast.error(results?.payload?.message, { position: "top-left" });
        setOpen(true);
      }
    });
  };
  return (
    <section className="section-sm">
      <Input type="text" placeholder={<Search />} />

      <div className=" grid grid-cols-3 gap-normal card ">
        <div className="rounded-xl  p-4 transition cursor-pointer flex items-center justify-center ">
          <CustomSheet
            title={"+ employee"}
            trigger={{ icon: User, name: "+ employee" }}
            fields={newWorkerInputs}
            selectFields={newWorkerSelects}
            actions={{
              onSubmit: addWorker,
              onSelectChange: setId,
              onFieldChange: setInput,
            }}
            states={{ open: open, setOpen: setOpen }}
          />
        </div>
        {workerList?.map((item, index) => (
          <EmployeeCard
            key={index}
            employee={item}
            positions={positions}
            roles={employeeRoles}
          />
        ))}
      </div>
    </section>
  );
}
