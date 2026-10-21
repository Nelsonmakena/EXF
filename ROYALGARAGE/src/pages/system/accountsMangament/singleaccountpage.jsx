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
export default function SingleAccount() {
  const { account_id } = useParams();
  return (
    <section>
      <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {/* {clientInfo.info.first_name[0].toUpperCase()}
              {clientInfo.info.last_name[0].toUpperCase()} */}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold md:text-2xl">
                  {/* {clientInfo.info.first_name} */}
                </h1>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  Active
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
            <Button variant="outline">Edit Client</Button>

            <Button variant="outline" size="icon" className="rounded-lg">
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
