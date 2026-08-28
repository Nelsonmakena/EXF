import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workerList: [],
  roles: [],
  noWork: [],
};

///all worker related logic fro the admin is here

//role list in system
export const roleList = createAsyncThunk("admin/role-list", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/admin/role-list",

    { withCredentials: true },
  );

  return response.data;
});

//adding roles

export const newRole = createAsyncThunk("admin/new-role", async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/admin/new-role",
    data,
    { withCredentials: true },
  );

  return response.data;
});

//removing roles
export const deleteRole = createAsyncThunk(
  "/deleteVehicle",
  async (role_id) => {
    console.log(role_id);

    const response = await axios.delete(
      "http://localhost:3000/api/admin/remove-role",
      {
        data: {
          role_id: role_id,
        },
        withCredentials: true,
      },
    );

    return response.data;
  },
);

// getting worker list
export const getWorkerList = createAsyncThunk("admin/worker-list", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/admin/workers",

    { withCredentials: true },
  );

  return response.data;
});

//list of workers with no active jobs
export const getNonUnassigned = createAsyncThunk(
  "admin/non-unassigned",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/no-work",

      { withCredentials: true },
    );

    return response.data;
  },
);

//adding a worker
export const addNewWorker = createAsyncThunk(
  "admin/new-worker",
  async (data) => {
    console.log(data);

    const response = await axios.post(
      "http://localhost:3000/api/admin/add-worker",
      data,
      { withCredentials: true },
    );
    return response.data;
  },
);

const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkerList.fulfilled, (state, action) => {
        state.workerList = action.payload.data;
      })
      .addCase(roleList.fulfilled, (state, action) => {
        state.roles = action.payload.data;
      })
      .addCase(addNewWorker.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.workerList.push(action.payload.data);
        }
      })
      .addCase(newRole.fulfilled, (state, action) => {
        state.roles.push(action.payload.data);
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        const deletedRoleID = action.payload.data.role_id;
        if (action.payload.success) {
          state.roles = state.roles.filter(
            (role) => role.role_id !== deletedRoleID,
          );
        }
      })
      .addCase(getNonUnassigned.fulfilled, (state, action) => {
        state.noWork = action.payload.data;
      });
  },
});

export default workerSlice.reducer;
