export default function EmployeeCard({
  employee,
  selected,
  onSelect,
  showAssignButton = false,
}) {
  const isAvailable = employee.status === "available";
  console.log(employee);

  return (
    <div
      className={`rounded-xl border p-4 transition ${
        selected
          ? "border-blue-500 bg-blue-50/50"
          : "border-primary/20 bg-card hover:border-primary"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
            <span className="text-primary">
              {employee.info.first_name[0].toUpperCase()}{" "}
            </span>
            <span className="text-secondary">
              {employee.info.last_name[0].toLowerCase()}
            </span>
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {employee.info.first_name} {employee.info.last_name}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              {employee.info.role_name}
            </p>
          </div>
        </div>

        {/* Status */}
        <span
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
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {employee.jobs.length} active{" "}
          {employee.jobs.length === 1 ? "job" : "jobs"}
        </span>

        {isAvailable && showAssignButton && (
          <button
            onClick={() => onSelect(employee.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              selected
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {selected ? (
              <span className="flex items-center gap-1">
                <Check size={13} />
                Selected
              </span>
            ) : (
              "Select"
            )}
          </button>
        )}

        {!isAvailable && (
          <span className="text-xs font-medium text-gray-400">
            {/* {employee.currentJob} */}
          </span>
        )}
      </div>
    </div>
  );
}
