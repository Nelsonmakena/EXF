import { useParams } from "react-router";

export default function SingleVehicle() {
  const { vehicle_id } = useParams();
  return (
    <section>
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold  ">Services</h2>
          <p className="mt-1 text-xs text-gray-500">
            Services included in this vehicle
          </p>
        </div>

        {/* <div className="divide-y divide-gray-100">
          {jobInformation.services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between gap-3 py-3  cursor-pointer"
            >
              <div className="flex flex-col  gap-1 text-sm">
                <div className="flex items-center  gap-3">
                  <span className="">{service.service_name}</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 size={17} className="text-accent" />
                  <h1 className=" text-gray-500">assigned to </h1>
                  <span className="text-sm tracking-widest font-bold text-accent">
                    {service.employee_name}
                  </span>
                </div>
              </div>

              {service.status === "in-progress" && (
                <span className="text-xs font-medium text-blue-600">
                  In progress
                </span>
              )}
            </div>
          ))}
        </div> */}
      </div>
      {/* //comment */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="mb-7">
          <h2 className="text-lg font-semibold  ">Job Activity</h2>

          <p className="mt-1 text-sm text-gray-500">
            Updates from the garage team
          </p>
        </div>

        <div>
          {/* {job.activity.map((item, index) => (
                <ActivityItem
                  key={`${item.title}-${item.time}`}
                  item={item}
                  isLast={index === job.activity.length - 1}
                />
              ))} */}
        </div>
      </div>
    </section>
  );
}
