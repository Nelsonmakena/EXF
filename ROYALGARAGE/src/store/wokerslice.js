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

// getting worker list
export const getWorkerList = createAsyncThunk("admin/worker-list", async () => {
  const response = await axios.get(
    "/api/admin/workers",

    { withCredentials: true },
  );

  return response.data;
});

//list of workers with no active jobs
export const getNonUnassigned = createAsyncThunk(
  "admin/non-unassigned",
  async () => {
    const response = await axios.get(
      "/api/admin/no-work",

      { withCredentials: true },
    );

    return response.data;
  },
);

//adding a worker
export const addNewWorker = createAsyncThunk(
  "admin/new-worker",
  async (data) => {
    const response = await axios.post("/api/admin/add-worker", data, {
      withCredentials: true,
    });
    return response.data;
  },
);

///updating employee info

export const updateProfile = createAsyncThunk("employee-profile", async () => {
  const response = await axios.post("/api/");
});
const workerSlice = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkerList.fulfilled, (state, action) => {
        state.workerList = action.payload.data;
      })

      .addCase(addNewWorker.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.workerList.push(action.payload.data);
        }
      })

      .addCase(getNonUnassigned.fulfilled, (state, action) => {
        state.noWork = action.payload.data;
      });
  },
});

export default workerSlice.reducer;
