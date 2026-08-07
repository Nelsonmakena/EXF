import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import vehicleReducer from "./vehicleslice";
import servicesReducer from "./serviceslice";
import workerSlice from "./admin/wokerslice";
import jobSlice from "./admin/jobsslice";
import dateSlice from "./appointmentsdates";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    services: servicesReducer,
    worker: workerSlice,
    jobs: jobSlice,
    appoitnmentDates: dateSlice,
  },
});

export default store;
