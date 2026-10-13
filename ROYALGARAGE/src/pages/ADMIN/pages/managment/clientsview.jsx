import { getClients } from "@/store/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "../../../../Comp/accountCard";

export default function ClientsView() {
  const { clientsList } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, []);
  return (
    <section>
      <div className=" grid grid-cols-3 gap-normal card">
        {clientsList.map((item) => (
          <AccountCard item={item} />
        ))}
      </div>
    </section>
  );
}
