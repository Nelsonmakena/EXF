import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicleList: [],
};

export const getIncomingVehicles = createAsyncThunk(
  "incoming-vehicles",
  async () => {
    const response = await axios.get("/api/worker/incoming-vehicles", {
      withCredentials: true,
    });
    return response.data;
  },
);
const assessmentSlice = createSlice({
  name: "assesment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncomingVehicles.fulfilled, (state, action) => {
      state.vehicleList = action.payload.data;
    });
  },
});
export default assessmentSlice.reducer;
