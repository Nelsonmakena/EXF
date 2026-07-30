import express from "express";
import {
  profiledata,
  updateProfile,
} from "../controllers/client/updateprofile.js";
import { authenicateMiddleware } from "../midlewares/authenicationmidleware.js";
import {
  addVehicle,
  getVehicles,
  deleteVehicle,
} from "../controllers/client/vehicle.js";
import { job, getAllJobs, billing } from "../controllers/jobs.js";
const Router = express.Router();

// authenicated middleware should read authenication mildware (layer 1)

// profile info getter after clients logs in
Router.get("/profileinfo", authenicateMiddleware, profiledata);

Router.post("/updateprofile", authenicateMiddleware, updateProfile);

// adding a new vehicle
Router.post("/addvehicle", authenicateMiddleware, addVehicle);

// veiw client vehicles
Router.get("/vehicle", authenicateMiddleware, getVehicles);

// client to delete a vehicle

Router.delete("/deletevehicle", authenicateMiddleware, deleteVehicle);

// client getting a job

Router.post("/newjob", authenicateMiddleware, job);

// fethng jobs for a client

Router.get("/jobs", authenicateMiddleware, getAllJobs);

//fetcth billing

Router.get("/billing", authenicateMiddleware, billing);

export default Router;
