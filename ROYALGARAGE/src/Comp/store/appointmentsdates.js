import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dates: [],
};

//client dates

export const getAppointmentDatesClient = createAsyncThunk(
  "/client_dates",
  async () => {
    const response = await axios.get("/api/client/appointment-list", {
      withCredentials: true,
    });
    return response.data;
  },
);

//admin dates

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAppointmentDatesClient.fulfilled, (state, action) => {
      console.log(action.payload.data);

      state.dates = action.payload.data;
    });
  },
});

export default datesSlice.reducer;
