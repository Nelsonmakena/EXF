import { useNavigate } from "react-router";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Mail, Map, Phone } from "lucide-react";

import Loader from "@/Comp/loader";
import { useDispatch } from "react-redux";
import { profile } from "@/Comp/store/authslice";

export default function ProfileEdit() {
  const [clientinfo, setClientInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile()).then((data) => {
      console.log(data.payload.success);

      if (data.payload.success) {
        setClientInfo(data.payload.data);
      } else {
        return <Loader />;
      }
    });
  }, []);

  if (clientinfo == null) {
    return <Loader />;
  }

  return (
    <>
      <section className=" container-main  flex flex-col w-full   min-h-dvh items-center md:flex-row ">
        <div className=" section flex flex-col  w-full  h-screen items-center gap-normal ">
          <div className="w-xs border-b-2 flex  justify-between">
            <h1 className="tracking-wider">
              {" "}
              <span className="text-primary"> N</span>ame{" "}
            </h1>
            {clientinfo.first_name +
              clientinfo.second_name +
              clientinfo.last_name}
          </div>
          <div className="w-xs border-b-2 flex  justify-between">
            <h1 className="tracking-wider">
              {" "}
              <span className="text-primary"> E</span>mail{" "}
            </h1>
            <p>{clientinfo.email}</p>
          </div>
          <div className="w-xs border-b-2 flex  justify-between">
            <h1 className="tracking-wider">
              {" "}
              <span className="text-primary"> A</span>dress{" "}
            </h1>
            <p>{clientinfo.address}</p>
          </div>
        </div>
      </section>
    </>
  );
}
