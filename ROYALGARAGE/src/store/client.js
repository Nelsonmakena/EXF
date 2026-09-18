import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clientsList: [],
  clientInfo: null,
  profileInfo: null,
};

//client

export const getClientProfile = createAsyncThunk(
  "/client/profile",

  async () => {
    const response = await axios.get(
      "/api/client/profile-info",

      { withCredentials: true },
    );

    return response.data;
  },
);

// add a new address

export const newAddress = createAsyncThunk("address", async (data) => {
  const response = await axios.put("/api/client/new-address", data, {
    withCredentials: true,
  });
  return response.data;
});

///admin
export const getClients = createAsyncThunk("client-list", async () => {
  const response = await axios.get("/api/admin/clients", {
    withCredentials: true,
  });
  return response.data;
});
export const getClientInfo = createAsyncThunk(
  "client-info",
  async (client_id) => {
    const response = await axios.get(`/api/admin/client/${client_id}`, {
      withCredentials: true,
    });
    return response.data;
  },
);
const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.fulfilled, (state, action) => {
        state.clientsList = action.payload.data;
      })
      .addCase(getClientInfo.fulfilled, (state, action) => {
        state.clientInfo = action.payload.data;
      })
      .addCase(getClientProfile.fulfilled, (state, action) => {
        state.profileInfo = action.payload.data;
      });
  },
});

export default clientSlice.reducer;
