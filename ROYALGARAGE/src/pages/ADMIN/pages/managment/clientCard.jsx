import { useState } from "react";
import { useNavigate } from "react-router";

export default function ClientCard({ client }) {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-xl p-4 transition cursor-pointer shadow-sm border border-primary/10 
      }`}
      onClick={() => navigate(`${client.client_id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border border-accent/20 text-sm font-semibold">
            <span className="text-primary">
              {client.first_name[0].toUpperCase()}{" "}
            </span>
            <span className="text-secondary">
              {client.last_name[0].toLowerCase()}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold dark:text-accent ">
              {client.first_name} {client.second_name[0].toUpperCase()}.
              {client.last_name}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {client.vehicles.length} Total{" "}
          {client.vehicles.length === 1 ? "car" : "cars"}
        </span>
        <span
          className={`text-xs  rounded-md px-2 py-1 ${!client.totalJobs && !client.totalServices ? "hidden" : "bg-secondary"}`}
        >
          <span className="px-1 tracking-wide ">jobs{client.totalJobs}</span>
          <span className="px-1 tracking-wide">
            services {client.totalServices}
          </span>
        </span>
      </div>
    </div>
  );
}
