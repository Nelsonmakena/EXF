import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobsList: [],
};

// all job related stufss

// geting list of all pending jobs
export const getJobList = createAsyncThunk("/admin/jobs", async () => {
  const response = await axios.get("http://localhost:3000/api/admin/jobslist", {
    withCredentials: true,
  });
  return response.data;
});

//getting list of recent jobs

// assigning job to worker

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getJobList.fulfilled, (state, action) => {
      state.jobsList = action.payload.data;
    });
  },
});

export default jobSlice.reducer;
