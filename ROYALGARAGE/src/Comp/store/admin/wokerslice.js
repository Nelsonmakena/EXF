import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  workerlist: [],
};

///all worker related logic fro the admin is here

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
      "http://localhost:3000/api/admin/addworker",
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
    builder.addCase(getWorkerList.fulfilled, (state, action) => {
      state.workerlist = action.payload.data;
    });
  },
});

export default workerSlice.reducer;
