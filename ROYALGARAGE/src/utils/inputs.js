import { data } from "react-router";

// new worker
export const newWorkerInputs = [
  { placeholder: "email", name: "email", type: "email" },
];
export const editWorkerSelects = {
  position: {
    header: "Position",
    idKey: "position_id",
    nameKey: "position_name",
    data: [],
  },

  role: {
    header: "Role",
    idKey: "role_id",
    nameKey: "role_name",
    data: [],
  },
};
export const newWorkerSelects = {
  position: {
    header: "Position",
    idKey: "position_id",
    nameKey: "position_name",
    data: [],
  },

  role: {
    header: "Role",
    idKey: "role_id",
    nameKey: "role_name",
    data: [],
  },
  account: {
    header: "account_type",
    idKey: "account_role_id",
    nameKey: "role_name",
    data: [],
  },
};
