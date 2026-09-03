import {
  asyncThunkCreator,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  assignedJobs: [],
  jobsList: [],
  clientJobs: [],
  jobInformation: null,
};
//client
//getting a new job
export const newJob = createAsyncThunk("/new-job", async (data) => {
  const response = await axios.put("/api/client/new-job", data, {
    withCredentials: true,
  });
  return response.data;
});

//fetching ongoing jobs list
export const getClientJobs = createAsyncThunk("/serviceList", async () => {
  const response = await axios.get("/api/client/jobs", {
    withCredentials: true,
  });
  return response.data;
});

//client jon info
export const clientJobInfo = createAsyncThunk(
  "/client-job-info",
  async (job_id) => {
    console.log(job_id);

    const response = await axios.get(`/api/client/jobs/${job_id}`, {
      withCredentials: true,
    });

    return response.data;
  },
);

//admin
//in progress job list
export const getInprogressJobs = createAsyncThunk(
  "/admin/in-progress",
  async () => {
    const response = await axios.get("/api/admin/in-progress", {
      withCredentials: true,
    });
    return response.data;
  },
);

// getting list of all pending jobs
export const getJobList = createAsyncThunk("/admin/jobs", async () => {
  const response = await axios.get("/api/admin/jobs-list", {
    withCredentials: true,
  });
  return response.data;
});

//getting list of recent jobs

// assigning job to worker
export const AssignJob = createAsyncThunk("/assign", async (data) => {
  console.log(data);

  const response = await axios.patch("/api/admin/assign", data, {
    withCredentials: true,
  });
  console.log(response.data);

  return response.data;
});
//info for a job
export const jobInfo = createAsyncThunk("/job-info", async (job_service_id) => {
  const response = await axios.get(`/api/admin/job-details/${job_service_id}`, {
    withCredentials: true,
  });
  return response.data;
});

///worker
//getting job list of assigned jobs
export const assignedJobsList = createAsyncThunk(
  "/worker/assigned",
  async () => {
    const response = await axios.get("/api/worker/jobs", {
      withCredentials: true,
    });
    return response.data;
  },
);

//getting job list of in progress jobs
export const myJobList = createAsyncThunk("/worker/inprogress", async () => {
  const response = await axios.get("/api/worker/in-progress", {
    withCredentials: true,
  });
  return response.data;
});

// accepting a job
export const acceptJob = createAsyncThunk(
  "/worker/accept",
  async (job_services_id) => {
    console.log(job_services_id);

    const response = await axios.post(
      "/api/worker/accept",
      {
        job_services_id: job_services_id,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientJobs.fulfilled, (state, action) => {
        state.clientJobs = action.payload.data;
      })
      .addCase(getJobList.fulfilled, (state, action) => {
        state.jobsList = action.payload.data;
      })
      .addCase(myJobList.fulfilled, (state, action) => {
        state.jobsList = action.payload.data;
      })
      .addCase(assignedJobsList.fulfilled, (state, action) => {
        state.assignedJobs = action.payload.data;
      })

      .addCase(acceptJob.fulfilled, (state, action) => {
        state.jobsList.filter(
          (item) => item.job_services_id !== action.payload.job_services_id,
        );
      })
      .addCase(getInprogressJobs.fulfilled, (state, action) => {
        state.inProgress = action.payload.data;
      })
      .addCase(jobInfo.fulfilled, (state, action) => {
        state.jobInformation = action.payload.data;
      })
      .addCase(clientJobInfo.fulfilled, (state, action) => {
        state.jobInformation = action.payload.data;
      });
  },
});

export default jobSlice.reducer;
