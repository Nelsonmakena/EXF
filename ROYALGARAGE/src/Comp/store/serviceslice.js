import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  ongoingServices: [],
  recentServices: [],
  availableServiceList: [],
};

//fetching serviceList
export const getServices = createAsyncThunk("/services", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/services/allservices",
  );
  return response.data;
});

//fetching ongloing services list

export const getServiceList = createAsyncThunk("/serviceList", async () => {
  const response = await axios.get("http://localhost:3000/api/client/jobs", {
    withCredentials: true,
  });
  return response.data;
});

export const newService = createAsyncThunk();

export const ServiceSlice = createSlice({
  name: "serviceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServiceList.fulfilled, (state, action) => {
        state.ongoingServices = action.payload.data;
      })
      .addCase(getServices.rejected, (state) => {
        state.availableServiceList = [];
      })
      .addCase(getServices.fulfilled, (state, action) => {
        console.log(action.payload);

        state.availableServiceList = action.payload.data;
        state.loading = false;
      })
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.availableServiceList = [];
      });
  },
});

export default ServiceSlice.reducer;
