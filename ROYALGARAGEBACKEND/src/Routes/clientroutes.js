import express from "express";
import {
  profileData,
  updateProfile,
} from "../controllers/client/updateprofile.js";
import { authenticateMiddleware } from "../midlewares/authenicationmidleware.js";
import {
  addVehicle,
  getVehicles,
  deleteVehicle,
} from "../controllers/client/vehicle.js";
import { job, getAllJobs, billing } from "../controllers/jobs.js";
import { TotalNumbersClient } from "../controllers/dashboarb.js";
import { appointmentsDatesList } from "../controllers/appointmentsdates.js";
const Router = express.Router();
Router.use(authenticateMiddleware);

// authenticated middleware should read authentication middleware (layer 1)

///dashboard
Router.get("/dashboard", TotalNumbersClient);

//appointment list
Router.get("/appointment-list", appointmentsDatesList);

// profile info getter after clients logs in
Router.get("/profile-info", profileData);

Router.post("/update-profile", updateProfile);

// adding a new vehicle
Router.post("/add-vehicle", addVehicle);

// view client vehicles
Router.get("/vehicle", getVehicles);

// client to delete a vehicle

Router.delete("/delete-vehicle", deleteVehicle);

// client getting a job

Router.post("/new-job", job);

// fethng jobs for a client

Router.get("/jobs", getAllJobs);

//fetcth billing

Router.get("/billing", billing);

export default Router;
