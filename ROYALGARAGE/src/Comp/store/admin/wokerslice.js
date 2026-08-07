import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workerList: [],
  roles: [],
};

///all worker related logic fro the admin is here

//role in system
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

// geting worker list
export const getWorkerList = createAsyncThunk("admin/workerlist", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/admin/workers",

    { withCredentials: true },
  );

  return response.data;
});
//adding a worker
export const addNewWorker = createAsyncThunk(
  "admin/newworker",
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
      .addCase(newRole.fulfilled, (state, action) => {
        state.roles.push(action.payload.data);
      });
  },
});

export default workerSlice.reducer;
