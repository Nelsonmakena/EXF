import { AvatarFormatter } from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AccountCard({ item, isSystem, isAdmin, actions }) {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-xl p-4 transition cursor-pointer shadow-sm border border-primary/10 
      }`}
      onClick={() => navigate(`${item.item_id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border border-accent/20 text-sm font-semibold">
            <span className="text-primary">
              {AvatarFormatter(item.first_name)}
            </span>
            <span className="text-secondary">
              {AvatarFormatter(item.last_name)}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold dark:text-accent ">
              {item.first_name} {item.second_name[0].toUpperCase()}
              {item.last_name}
            </h3>
            <p className="text-[12px]  text-gray-500">{item.email}</p>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {item.vehicles.length} Total{" "}
            {item.vehicles.length === 1 ? "car" : "cars"}
          </span>
          <span
            className={`text-[11px] text-primary rounded-md px-2 py-1 ${!item.totalJobs && !item.totalServices ? "hidden" : "border border-primary/20"}`}
          >
            <span className="px-1 tracking-wide ">jobs {item.totalJobs}</span>
            <span className="px-1 tracking-wide">
              services {item.totalServices}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
