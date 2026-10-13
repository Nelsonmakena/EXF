import AccountCard from "@/Comp/accountCard";
import RolesCard from "@/Comp/roleCard";
import { getAccounts } from "@/store/accountsslice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SystemAccounts() {
  const dispatch = useDispatch();
  const { Accounts } = useSelector((state) => state.Accounts);

  useEffect(() => {
    dispatch(getAccounts());
  }, []);
  console.log(Accounts);

  return (
    <section className="section-sm">
      <div className=" grid grid-cols-3 gap-normal card">
        {Accounts.map((item) => (
          <AccountCard item={item} isSystem={true} />
        ))}
      </div>
    </section>
  );
}
