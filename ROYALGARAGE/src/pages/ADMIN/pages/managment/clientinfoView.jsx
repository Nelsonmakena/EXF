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

import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getClientInfo } from "@/Comp/store/client";
import { formatDate } from "@/utils/utils";
export default function ClientInfoView() {
  const { client_id } = useParams();
  const { clientInfo } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientInfo(client_id));
  }, []);
  console.log(clientInfo);
  if (!clientInfo) {
    return <h1>loading</h1>;
  }
  return (
    <div className="container-main">
      <main className="space-y-6 py-6 md:py-8">
        {/* ================================================= */}
        {/* BACK BUTTON */}
        {/* ================================================= */}

        <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={17} />
          Back to clients
        </button>

        {/* ================================================= */}
        {/* CLIENT HEADER */}
        {/* ================================================= */}

        <div className="rounded-2xl border bg-card p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Client identity */}
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {clientInfo.info.first_name[0].toUpperCase()}
                {clientInfo.info.last_name[0].toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold md:text-2xl">
                    {clientInfo.info.first_name}
                  </h1>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    Active
                  </span>
                </div>

                <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} />
                    {clientInfo.info.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Phone size={14} />
                    {clientInfo.info.phone}
                  </span>
                </div>
                <div className="p-0.5 text-sm mt-2 gap-1 sm:gap-4">
                  <span className="text-primary">joined at</span>{" "}
                  {formatDate(clientInfo.info.createdAt)}
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

        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {/* Total jobs */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Jobs</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wrench size={17} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {clientInfo.info.total_jobs}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Since January 2025
            </p>
          </div>

          {/* In progress */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">In Progress</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                <Clock3 size={17} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold">2</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Currently being serviced
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Completed</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <CheckCircle2 size={17} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold">10</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Successfully completed
            </p>
          </div>

          {/* Vehicles */}

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Vehicles</p>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <CarFront size={17} />
              </div>
            </div>

            <p className="mt-3 text-2xl font-bold">3</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Registered vehicles
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* VEHICLES + JOBS */}
        {/* ================================================= */}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ================================================= */}
          {/* VEHICLES */}
          {/* ================================================= */}

          <section className="space-y-4 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Vehicles</h2>

                <p className="text-sm text-muted-foreground">
                  Client's registered vehicles
                </p>
              </div>

              <Button size="icon" variant="outline" className="rounded-lg">
                <Plus size={17} />
              </Button>
            </div>

            {/* Vehicle 1 */}
            {clientInfo.info.vehicles.map((item) => (
              <div className="rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                      <CarFront size={20} />
                    </div>

                    <div>
                      <p className="font-semibold">Toyota Harrier</p>

                      <p className="text-xs text-muted-foreground">KCA 321Z</p>
                    </div>
                  </div>

                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Color</p>

                    <p className="mt-1 text-sm font-medium">Black</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Jobs</p>

                    <p className="mt-1 text-sm font-medium">8</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Last service: 12 Aug 2026
                </p>
              </div>
            ))}
          </section>

          {/* ================================================= */}
          {/* JOB HISTORY */}
          {/* ================================================= */}

          <section className="space-y-4 lg:col-span-2">
            <div>
              <h2 className="text-lg font-semibold">Job History</h2>

              <p className="text-sm text-muted-foreground">
                All jobs associated with this client
              </p>
            </div>

            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto">
              <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                All
              </button>

              <button className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                In Progress
              </button>

              <button className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
                Completed
              </button>
            </div>

            {/* Jobs container */}
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              {/* Job 1 */}
              <div className="group border-b p-4 transition-colors hover:bg-muted/40 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Wrench size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">KCA 321Z</p>

                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
                          In Progress
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Toyota Harrier · Black
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>Oil Change</span>

                  <span>Brake Inspection</span>

                  <span>12 Aug 2026</span>
                </div>
              </div>

              {/* Job 2 */}
              <div className="group border-b p-4 transition-colors hover:bg-muted/40 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <CheckCircle2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">KCB 452A</p>

                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          Completed
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Mazda CX-5 · White
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>Wheel Alignment</span>

                  <span>Tire Rotation</span>

                  <span>02 Jul 2026</span>
                </div>
              </div>

              {/* Job 3 */}
              <div className="group border-b p-4 transition-colors hover:bg-muted/40 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      <CheckCircle2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">KCA 321Z</p>

                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          Completed
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Toyota Harrier · Black
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>Full Service</span>

                  <span>Engine Diagnostics</span>

                  <span>15 Jun 2026</span>
                </div>
              </div>

              {/* Job 4 */}
              <div className="group p-4 transition-colors hover:bg-muted/40 md:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                      <Clock3 size={18} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">KCD 789B</p>

                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">
                          In Progress
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Subaru Forester · Silver
                      </p>
                    </div>
                  </div>

                  <button className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span>Suspension Check</span>

                  <span>Brake Service</span>

                  <span>18 Aug 2026</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
