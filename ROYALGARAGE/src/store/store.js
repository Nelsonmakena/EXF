import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authslice";
import vehicleReducer from "./vehicleslice";
import servicesReducer from "./serviceslice";
import workerSlice from "./wokerslice";
import jobSlice from "./jobsslice";
import dateSlice from "./appointmentsdates";
import dashboardSlice from "./dashboardstarts";
import clientSlice from "./client";
import AccountSlice from "./accountsslice";
import AssessmentSlice from "./assessmentSlice";
import ProductSlice from "./productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
    services: servicesReducer,
    products: ProductSlice,
    worker: workerSlice,
    jobs: jobSlice,
    appointmentsDates: dateSlice,
    dashboard: dashboardSlice,
    client: clientSlice,
    Accounts: AccountSlice,
    assessments: AssessmentSlice,
  },
});

export default store;
