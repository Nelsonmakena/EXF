import { Button } from "@/components/ui/button";
import { AvatarFormatter } from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AccountCard({ item, isSystem, isAdmin, actions }) {
  console.log(item.client_id);

  const navigate = useNavigate();
  const handleNavigation = () => {
    isSystem
      ? navigate(`/misc/management/accounts/${item.account_id}`)
      : navigate(`/admin/management/clients/${item.client_id}`);
  };
  return (
    <div
      className={`rounded-xl p-4 transition cursor-pointer shadow-sm border border-primary/10 min-h-25
      }`}
      onClick={() => handleNavigation()}
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
              {item.first_name} {AvatarFormatter(item.second_name, ".")}
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
      {isSystem && (
        <div className="mt-4 flex items-center justify-between">
          <span
            className={`text-xs ${item.owner === "client" ? "text-primary" : "text-secondary"}`}
          >
            {item.owner}
          </span>
          <span>
            <span className="text-xs">
              {item.is_active ? "active" : "de-activated"}{" "}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
