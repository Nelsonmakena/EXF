// new worker
export const newWorkerInputs = [
  { Placeholder: "email", name: "email", type: "email" },
];
export const updateRoleINputs = [
  { label: "role name", name: "role_name", type: "text" },
  { label: "role description", name: "role_description", type: "text" },
];
export const editCategoryInputs = [
  { label: "category name", name: "category_name", type: "text" },
];
export const EmployeePositionsInputs = [
  { label: "position name", name: "role_name", type: "text" },
  { label: "position description", name: "role_description", type: "text" },
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

export const updateProductInputs = [
  { label: "product name", name: "product_name", type: "text" },
  { label: "product image", name: "product_image", type: "text" },
  { label: "product description", name: "product_description", type: "text" },
  { label: "product price", name: "product_price", type: "text" },
  { label: "product category", name: "product_category", type: "text" },
  { label: "product discount", name: "product_discount", type: "text" },
];

export const newServiceInputs = [
  { label: "service name", name: "service_name", type: "text" },
  { label: "service image", name: "service_image", type: "text" },
  { label: "service description", name: "service_description", type: "text" },
  { label: "service price", name: "service_price", type: "text" },
  { label: "service discount", name: "service_discount", type: "text" },
];
export const newServicesSelects = {
  categories: {
    header: "service category",
    idKey: "service_category_id",
    nameKey: "category_name",
    data: [],
  },
};

export const newStockInputs = [
  { label: "quantity", name: "stock", type: "text" },
  { label: "supplier", name: "supplier", type: "text" },
];

export const newEmployeeRoleInputs = [
  { label: "role name", name: "role_name", type: "text" },
  { label: "role description", name: "role_description", type: "text" },
];

export const newAccountRoleInputs = [
  { label: "account category", name: "role_name", type: "text" },
  { label: "account description", name: "role_description", type: "text" },
];
