import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  Check,
  Search,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

const jobData = {
  id: "1042",
  status: "Awaiting Assignment",
  appointment: "31 Aug 2026 · 10:00 AM",
  customer: "Nelson Ndolo",

  vehicle: {
    make: "Toyota",
    model: "Fielder",
    year: 2018,
    plate: "KDG 123A",
    mileage: "128,430 km",
  },

  services: [
    "Brake Inspection",
    "Front Brake Pad Replacement",
    "Wheel Alignment",
  ],
};

const employeesData = [
  {
    id: 1,
    name: "John Kamau",
    role: "Mechanic",
    jobs: 0,
    status: "available",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    role: "Technician",
    jobs: 0,
    status: "available",
  },
  {
    id: 3,
    name: "David Ochieng",
    role: "Mechanic",
    jobs: 0,
    status: "available",
  },
  {
    id: 4,
    name: "Peter Mwangi",
    role: "Electrician",
    jobs: 1,
    status: "busy",
    currentJob: "#1039",
  },
  {
    id: 5,
    name: "Brian Otieno",
    role: "Mechanic",
    jobs: 2,
    status: "busy",
    currentJob: "#1037",
  },
  {
    id: 6,
    name: "Grace Njeri",
    role: "Technician",
    jobs: 0,
    status: "available",
  },
];

function EmployeeCard({
  employee,
  selected,
  onSelect,
  showAssignButton = false,
}) {
  const isAvailable = employee.status === "available";

  return (
    <div
      className={`rounded-xl border p-4 transition ${
        selected
          ? "border-blue-500 bg-blue-50/50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
            {employee.name
              .split(" ")
              .map((name) => name[0])
              .join("")}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {employee.name}
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">{employee.role}</p>
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
          {employee.jobs} active {employee.jobs === 1 ? "job" : "jobs"}
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
            {employee.currentJob}
          </span>
        )}
      </div>
    </div>
  );
}

function JobDetails() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
            <Wrench size={19} className="text-gray-700" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Job #{jobData.id}</p>

            <h2 className="font-semibold text-gray-900">Job Details</h2>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {/* Status */}
        <div>
          <p className="text-xs text-gray-500">Status</p>

          <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {jobData.status}
          </span>
        </div>

        {/* Vehicle */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Vehicle
          </p>

          <div className="rounded-xl bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <Car size={20} className="text-gray-600" />

              <div>
                <p className="font-semibold text-gray-900">
                  {jobData.vehicle.make} {jobData.vehicle.model}
                </p>

                <p className="text-xs text-gray-500">
                  {jobData.vehicle.year} · {jobData.vehicle.plate}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-200 pt-3">
              <span className="text-xs text-gray-500">Mileage</span>

              <span className="text-xs font-medium text-gray-900">
                {jobData.vehicle.mileage}
              </span>
            </div>
          </div>
        </div>

        {/* Customer */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <UserRound size={17} className="text-gray-600" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Customer</p>

            <p className="text-sm font-medium text-gray-900">
              {jobData.customer}
            </p>
          </div>
        </div>

        {/* Appointment */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
            <CalendarDays size={17} className="text-gray-600" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Appointment</p>

            <p className="text-sm font-medium text-gray-900">
              {jobData.appointment}
            </p>
          </div>
        </div>

        {/* Services */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
            Services
          </p>

          <div className="space-y-2">
            {jobData.services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                {service}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminAssignJob() {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const availableEmployees = useMemo(() => {
    return employees.filter(
      (employee) =>
        employee.status === "available" &&
        employee.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [employees, search]);

  const allEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [employees, search]);

  const toggleEmployee = (employeeId) => {
    setSelectedEmployees((current) =>
      current.includes(employeeId)
        ? current.filter((id) => id !== employeeId)
        : [...current, employeeId],
    );
  };

  const assignEmployees = () => {
    if (selectedEmployees.length === 0) return;

    setEmployees((current) =>
      current.map((employee) =>
        selectedEmployees.includes(employee.id)
          ? {
              ...employee,
              status: "busy",
              jobs: employee.jobs + 1,
              currentJob: `#${jobData.id}`,
            }
          : employee,
      ),
    );

    setSelectedEmployees([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              <ArrowLeft size={16} />
              Back to Jobs
            </button>

            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-gray-500">Job #{jobData.id}</p>

                <h1 className="text-2xl font-bold text-gray-950">
                  Assign Employees
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
            <Users size={18} className="text-gray-500" />

            <span className="text-sm text-gray-600">
              {selectedEmployees.length} selected
            </span>
          </div>
        </div>

        {/* Three columns */}
        <div className="grid gap-6 xl:grid-cols-[0.85fr_1fr_1fr]">
          {/* COLUMN 1 — JOB DETAILS */}
          <JobDetails />

          {/* COLUMN 2 — AVAILABLE EMPLOYEES */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Available Employees
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Employees currently without a job
                  </p>
                </div>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                  {availableEmployees.length} available
                </span>
              </div>

              {/* Search */}
              <div className="relative mt-4">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-3 p-5">
              {availableEmployees.length > 0 ? (
                availableEmployees.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    selected={selectedEmployees.includes(employee.id)}
                    onSelect={toggleEmployee}
                    showAssignButton
                  />
                ))
              ) : (
                <div className="py-10 text-center">
                  <Users size={30} className="mx-auto text-gray-300" />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No available employees
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Try another search.
                  </p>
                </div>
              )}
            </div>

            {/* Assign button */}
            {selectedEmployees.length > 0 && (
              <div className="sticky bottom-0 border-t border-gray-100 bg-white p-4">
                <button
                  onClick={assignEmployees}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  <Check size={17} />
                  Assign {selectedEmployees.length}{" "}
                  {selectedEmployees.length === 1 ? "Employee" : "Employees"}
                </button>
              </div>
            )}
          </section>

          {/* COLUMN 3 — ALL EMPLOYEES */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900">All Employees</h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Everyone in the garage
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                  {employees.length}
                </span>
              </div>
            </div>

            <div className="space-y-3 p-5">
              {allEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
