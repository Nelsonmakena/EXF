import { getClients } from "@/Comp/store/client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientCard from "./clientCard";

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
          <ClientCard client={item} />
        ))}
      </div>
    </section>
  );
}
