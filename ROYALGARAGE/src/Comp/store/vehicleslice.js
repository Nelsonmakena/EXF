import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vehicles: [],
  loading: false,
  totalVehicle: null,
};

//fetching vehicles
export const getVehiclelist = createAsyncThunk("/vehicles", async () => {
  const response = await axios.get("http://localhost:3000/api/client/vehicle", {
    withCredentials: true,
  });

  return response.data;
});

//adding vehicles

export const newVehicle = createAsyncThunk("/addVehicle", async (data) => {
  console.log(data);

  const add = await axios.post(
    "http://localhost:3000/api/client/add-vehicle",
    data,
    { withCredentials: true },
  );
  console.log(add.data);

  return add.data;
});

///deleting a vehicle

export const removeVehicle = createAsyncThunk(
  "/removeVehicle",
  async (vehicle_id) => {
    const response = await axios.delete(
      "http://localhost:3000/api/client/delete-vehicle",
      {
        data: {
          vehicle_id: vehicle_id,
        },
        withCredentials: true,
      },
    );

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
        state.vehicles = [];
      })
      .addCase(newVehicle.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.vehicles.push(action.payload.data);
        }
      })
      .addCase(total_No_Of_Vehicles.fulfilled, (state, action) => {
        state.totalVehicle = action.payload.data.vehicles_number;
      })
      .addCase(removeVehicle.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          const deletedVehicleId = action.payload.data;
          state.vehicles = state.vehicles.filter(
            (vehicle) => vehicle.vehicle_id !== deletedVehicleId,
          );
        }
      });
  },
});
export const { SetVehicle } = vehicleSlice.actions;
export default vehicleSlice.reducer;
