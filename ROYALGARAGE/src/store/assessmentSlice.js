import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicleList: [],
  garageSlot: {},
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
//single assessment item

export const getSingleAssessmentItem = createAsyncThunk(
  "single-assessment",
  async (garage_id) => {
    const response = await axios.get(
      `/api/worker/incoming-vehicles/${garage_id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);
const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIncomingVehicles.fulfilled, (state, action) => {
        state.vehicleList = action.payload.data;
      })
      .addCase(getSingleAssessmentItem.fulfilled, (state, action) => {
        state.garageSlot = action.payload.data;
      });
  },
});
export default assessmentSlice.reducer;
