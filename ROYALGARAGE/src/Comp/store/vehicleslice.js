import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicles: [],
  loading: false,
};

//fething vehicles
export const getVehiclelist = createAsyncThunk("/vehicles", async () => {
  const response = await axios.get("http://localhost:3000/api/client/vehicle", {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
});

//adding vehicles

export const newVehicle = createAsyncThunk("/addvehicle", async (data) => {
  const add = await axios.post(
    "http://localhost:3000/api/client/addvehicle",
    data,
    { withCredentials: true },
  );
  console.log(add.data);

  return add.data;
});

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    SetVehicle: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehiclelist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getVehiclelist.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data;
      })
      .addCase(getVehiclelist.rejected, (state, action) => {
        state.loading = false;
        state.vehicles = {};
      });
  },
});
export const { SetVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
