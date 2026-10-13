import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  accountRoles: [],
  Accounts: [],
  employeeRoles: [],
};
//list of all accounts
export const getAccounts = createAsyncThunk("/accounts", async () => {
  const response = await axios.get("/api/system/accounts", {
    withCredentials: true,
  });
  console.log(response.data);

  return response.data;
});

export const getAccountRoles = createAsyncThunk("/accounts-roles", async () => {
  const response = await axios.get("/api/system/account", {
    withCredentials: true,
  });
  return response.data;
});
export const newAccountRole = createAsyncThunk(
  "new-account-role",
  async (data) => {
    const response = await axios.post("/api/system/account", data, {
      withCredentials: true,
    });
    return response.data;
  },
);
export const removeAccountRole = createAsyncThunk(
  "delete-accountRole",
  async (account_role_id) => {
    const response = await axios.delete(
      `/api/system/account/${account_role_id}`,
      { withCredentials: true },
    );
    return response.data;
  },
);
export const updateAccountRole = createAsyncThunk(
  "update-accountRole",
  async (data) => {
    const response = await axios.delete(
      `/api/system/account/${data.account_role_id}`,
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);
//adding  employee roles

export const newRole = createAsyncThunk("system/new-role", async (data) => {
  const response = await axios.post("/api/system/employee-role", data, {
    withCredentials: true,
  });

  return response.data;
});
//removing roles
export const deleteRole = createAsyncThunk(
  "/deleteVehicle",
  async (role_id) => {
    const response = await axios.delete(
      `/api/system/employee-role/${role_id}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  },
);
//employee role list in system
export const getRoleList = createAsyncThunk("/employee-role-list", async () => {
  const response = await axios.get("/api/system/employee-roles", {
    withCredentials: true,
  });

  return response.data;
});
export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAccountRoles.fulfilled, (state, action) => {
        state.accountRoles = action.payload.data;
      })
      .addCase(newAccountRole.fulfilled, (state, action) => {
        state.accountRoles.push(action.payload.data);
      })
      .addCase(getRoleList.fulfilled, (state, action) => {
        state.employeeRoles = action.payload.data;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const deletedRoleID = action.payload.data.role_id;
        if (action.payload.success) {
          state.employeeRoles = state.employeeRoles.filter(
            (role) => role.role_id !== deletedRoleID,
          );
        }
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.Accounts = action.payload.data;
      });
  },
});

export default AccountSlice.reducer;
