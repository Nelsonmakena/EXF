import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stats: [],
};

//worker dashboard stats

export const getWorkerDashboard = createAsyncThunk("/worker", async () => {
  const response = await axios.get("/api/worker/dashboard", {
    withCredentials: true,
  });
  return response.data;
});
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkerDashboard.fulfilled, (state, action) => {
      state.stats = action.payload.data;
    });
  },
});

export default dashboardSlice.reducer;
