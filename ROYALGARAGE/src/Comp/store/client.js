import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  clientsList: [],
  clientInfo: null,
};

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
      });
  },
});

export default clientSlice.reducer;
