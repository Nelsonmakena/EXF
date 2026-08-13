import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenicated: false,
  isLoading: true,
  userinfo: null,
  Role: null,
};
//profile info
export const profile = createAsyncThunk(
  "/client/profile",

  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/client/profileinfo",

      { withCredentials: true },
    );

    return response.data;
  },
);
//register a user
export const registerUser = createAsyncThunk(
  "/auth/register",

  async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/authenication/register",
      data,
      { withCredentials: true },
    );

    return response.data;
  },
);

//login user
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/authenication/login",
      data,
      { withCredentials: true },
    );

    return response.data;
  },
);

//login admin
export const adminlogin = createAsyncThunk(
  "/auth/admin",

  async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/authenication/admin",
      data,
      { withCredentials: true },
    );

    return response.data;
  },
);

//login worker

export const workerlogin = createAsyncThunk(
  "/auth/worker",

  async (data) => {
    const response = await axios.post(
      "http://localhost:3000/api/authenication/worker-login",
      data,
      { withCredentials: true },
    );

    return response.data;
  },
);

//checking auth status of logged in users

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",

  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/authenication/checkauth",
      {
        withCredentials: true,
        headers: {
          "cache-control":
            "no-store, no-cache, must-revalidate,proxy-revalidate",
        },
      },
    );

    return response.data;
  },
);
//login out anyone
export const logoutanyone = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/authenication/logout",
      {
        withCredentials: true,
        headers: {
          "cache-control":
            "no-store, no-cache, must-revalidate,proxy-revalidate",
        },
      },
    );

    return response.data;
  },
);

const authSlice = createSlice({
  name: "authenication",
  initialState,
  reducers: {
    SetUserinfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.user;
          console.log(state.userinfo);

          state.Role = action.payload.user.role;
          state.isAuthenicated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.Role = null;
          state.isAuthenicated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(adminlogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminlogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.name;
          state.Role = action.payload.role;
          state.isAuthenicated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.Role = null;
          state.isAuthenicated = false;
        }
      })
      .addCase(adminlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(workerlogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(workerlogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.name;
          state.Role = action.payload.role;
          state.isAuthenicated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.Role = null;
          state.isAuthenicated = false;
        }
      })
      .addCase(workerlogin.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.user;
          console.log(state.userinfo);
          state.Role = action.payload.user.role;
          state.isAuthenicated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.Role = null;
          state.isAuthenicated = false;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;
        state.Role = null;
        state.isAuthenicated = false;
      })
      .addCase(logoutanyone.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = null;
          state.Role = null;
          state.isAuthenicated = false;
        }
      });
  },
});

export const { SetUserinfo } = authSlice.actions;
export default authSlice.reducer;
