import { useState } from "react";
import { useNavigate } from "react-router";

export default function ClientCard({ client }) {
  const navigate = useNavigate();
  const isAvailable = true;
  console.log(client);

  return (
    <div
      className={`rounded-xl border p-4 transition cursor-pointer ${
        isAvailable
          ? "border-accent/20 bg-blue-50/50 hover:border-secondary/20"
          : "border-primary/20 bg-card hover:border-primary"
      }`}
      onClick={() => navigate(`${client.client_id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
            <span className="text-primary">
              {client.first_name[0].toUpperCase()}{" "}
            </span>
            <span className="text-secondary">
              {client.last_name[0].toLowerCase()}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {client.first_name} {client.second_name[0].toUpperCase()}.
              {client.last_name}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              {/* {employee.info.role} */}
            </p>
          </div>
        </div>

        {/* Status */}
        {/* <span
          className={`flex items-center gap-1.5 text-xs font-medium ${
            isAvailable ? "text-green-600" : "text-orange-600"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isAvailable ? "bg-green-500" : "bg-orange-500"
            }`}
          />

          {isAvailable ? "Available" : "Busy"}
        </span> */}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {client.vehicles.length} Total{" "}
          {client.vehicles.length === 1 ? "car" : "cars"}
        </span>
        <span className="text-xs text-gray-500">
          jobs{client.totalJobs}
          services {client.totalServices}
        </span>
      </div>
    </div>
  );
}
