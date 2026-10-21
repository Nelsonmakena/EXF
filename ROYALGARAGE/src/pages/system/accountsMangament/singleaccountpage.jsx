import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import {
  ArrowLeft,
  CarFront,
  CheckCircle2,
  Clock3,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deactivateAccount, getAccount } from "@/store/accountsslice";
import { toast } from "sonner";
export default function SingleAccount() {
  const { account } = useSelector((state) => state.Accounts);
  const { account_id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAccount(account_id));
  }, []);

  const accountConfigure = async () => {
    const data = {
      account_id: account.account_id,
      state: account.is_active ? "false" : "true",
    };
    console.log(data);
    dispatch(deactivateAccount(data)).then((results) => {
      if (results.payload.success) {
        toast(results.payload.message);
        dispatch(getAccount(account_id));
      } else {
        toast(results.payload.message);
      }
    });
  };

  return (
    <section>
      <div className="rounded-2xl  bg-card p-5  md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold md:text-2xl">
                  {account.first_name}
                  {account.last_name}
                </h1>

                <span
                  className={`rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium ${account.is_active ? "text-accent" : "text-destructive"} `}
                >
                  {account.is_active ? "Active" : "banned"}
                </span>
              </div>

              <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-4">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} />
                  {/* {clientInfo.info.email} */}
                </span>

                <span className="flex items-center gap-1.5">
                  <Phone size={14} />
                  {/* {clientInfo.info.phone} */}
                </span>
              </div>
              <div className="p-0.5 text-sm mt-2 gap-1 sm:gap-4">
                <span className="text-primary">joined at</span>{" "}
                {/* {formatDate(clientInfo.info.createdAt)} */}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="lg"
              variant={`${account.is_active ? "destructive" : "secondary"}`}
              onClick={() => accountConfigure()}
            >
              {account.is_active ? "de-activate" : "activate"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
