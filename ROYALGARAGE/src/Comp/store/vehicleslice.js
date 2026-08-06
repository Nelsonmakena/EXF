import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicles: [],
  loading: false,
  totalVehicle: null,
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

///deleteing a vehicle

export const removeVehicle = createAsyncThunk(
  "/removevehicle",
  async (data) => {
    const response = await axios.delete(
      "http://localhost:3000/api/client/deletevehicle",
      data,
      { withCredentials: true },
    );
    console.log(response.data);

    return response.data;
  },
);

//number of vehicles

export const total_No_Of_Vehicles = createAsyncThunk("/total", async () => {
  const response = await axios.get(
    "http://localhost:3000/api/client/dashboard",
    {
      withCredentials: true,
    },
  );

  return response.data;
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
      })
      .addCase(newVehicle.fulfilled, (state, action) => {
        console.log(action.payload.data);

        console.log(state.vehicles);
        state.vehicles.push(action.payload.data);
        console.log(state.vehicles);
      })
      .addCase(total_No_Of_Vehicles.fulfilled, (state, action) => {
        state.totalVehicle = action.payload.data.vehicles_number;
      })
      .addCase(removeVehicle.fulfilled, (state, action) => {});
  },
});
export const { SetVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
