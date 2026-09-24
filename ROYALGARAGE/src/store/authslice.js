import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  userinfo: null,
};

//register a user
export const registerUser = createAsyncThunk(
  "/auth/register",

  async (data) => {
    const response = await axios.post("/api/authentication/register", data, {
      withCredentials: true,
    });

    return response.data;
  },
);

//login
export const loginUser = createAsyncThunk(
  "/auth/login",

  async (data) => {
    const response = await axios.post("/api/authentication/login", data, {
      withCredentials: true,
    });

    return response.data;
  },
);

//login admin
export const adminLogin = createAsyncThunk(
  "/auth/admin",

  async (data) => {
    const response = await axios.post("/api/authentication/admin", data, {
      withCredentials: true,
    });

    return response.data;
  },
);

//wk login

export const wkLogin = createAsyncThunk("/auth/wk", async (data) => {
  const response = await axios.post("/api/authentication/employee", data, {
    withCredentials: true,
  });

  return response.data;
});
//checking auth status of logged in users

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",

  async () => {
    const response = await axios.get("/api/authentication/check-auth", {
      withCredentials: true,
      headers: {
        "cache-control": "no-store, no-cache, must-revalidate,proxy-revalidate",
      },
    });

    return response.data;
  },
);
//login out anyone
export const logoutAnyone = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.get("/api/authentication/logout", {
      withCredentials: true,
      headers: {
        "cache-control": "no-store, no-cache, must-revalidate,proxy-revalidate",
      },
    });

    return response.data;
  },
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    SetUserinfo: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userinfo = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.userinfo = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.data;
          state.isAuthenticated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.userinfo = null;
        state.isAuthenticated = false;
      })
      .addCase(wkLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(wkLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.data;
          state.isAuthenticated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(wkLogin.rejected, (state) => {
        state.isLoading = false;
        state.userinfo = null;
        state.isAuthenticated = false;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.name;

          state.isAuthenticated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;

          state.isAuthenticated = false;
        }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;

        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = action.payload.data;
          state.isAuthenticated = true;
        } else {
          state.isLoading = false;
          state.userinfo = null;

          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.userinfo = null;

        state.isAuthenticated = false;
      })
      .addCase(logoutAnyone.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoading = false;
          state.userinfo = null;
          state.isAuthenticated = false;
        }
      });
  },
});

export const { SetUserinfo } = authSlice.actions;
export default authSlice.reducer;
