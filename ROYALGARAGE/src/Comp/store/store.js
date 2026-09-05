import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import vehicleReducer from "./vehicleslice";
import servicesReducer from "./serviceslice";
import workerSlice from "./wokerslice";
import jobSlice from "./jobsslice";
import dateSlice from "./appointmentsdates";
import dashboardSlice from "./dashboardstarts";
import clientSlice from "./client";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    services: servicesReducer,
    worker: workerSlice,
    jobs: jobSlice,
    appointmentsDates: dateSlice,
    dashboard: dashboardSlice,
    client: clientSlice,
  },
});

export default store;
