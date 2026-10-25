import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  positions: [],
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

//list of positions

export const positionList = createAsyncThunk("positions", async () => {
  const response = await axios.get("/api/system/positions", {
    withCredentials: true,
  });
  return response.data;
});

// adding a new position
export const newPosition = createAsyncThunk("new-position", async (data) => {
  const response = await axios.put("/api/system/positions", data, {
    withCredentials: true,
  });
  return response.data;
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
      .addCase(getNonUnassigned.fulfilled, (state, action) => {
        state.noWork = action.payload.data;
      })
      .addCase(positionList.fulfilled, (state, action) => {
        state.positions = action.payload.data;
      });
  },
});

export default workerSlice.reducer;
