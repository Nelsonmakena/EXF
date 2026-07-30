import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import vehicleReducer from "./vehicleslice";
import servicesReducer from "./serviceslice";
import workerSlice from "./admin/wokerslice";
import jobSlice from "./admin/jobsslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    services: servicesReducer,
    worker: workerSlice,
    jobs: jobSlice,
  },
});

export default store;
