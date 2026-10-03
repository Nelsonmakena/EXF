import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  AccountRoles: [],
};

export const getAccountRoles = createAsyncThunk("/accounts-roles", async () => {
  const response = await axios.get("/api/system/account", {
    withCredentials: true,
  });
  return response.data;
});
export const AccountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountRoles.fulfilled, (state, action) => {
      state.AccountRoles = action.payload;
    });
  },
});

export default AccountSlice.reducer;
