import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  employeeProfile: null,
};

///adding new employye profile info

export const addProfileInfo = createAsyncThunk("profile-data", async (data) => {
  const resoponse = await axios.put("/api/worker/profile", data, {
    withCredentials: true,
  });
  return resoponse.data;
});
export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default employeeSlice.reducer;
