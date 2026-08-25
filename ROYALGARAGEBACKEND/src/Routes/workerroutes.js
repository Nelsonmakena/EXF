import express from "express";

import {
  authenticateMiddleware,
  workerChecker,
} from "../midlewares/authenicationmidleware.js";

import {
  profile,
  updateProfile,
} from "./../controllers/Worker/workersettings.js";

import {
  employeeJobList,
  acceptJob,
  updateJobStatus,
  InProgressEmployee,
} from "../controllers/jobs.js";

import { totalAssigned } from "../controllers/Worker/dahsboard.js";
const Router = express.Router();

Router.use(authenticateMiddleware, workerChecker);

//dashboard routes
Router.get("/dashboard", totalAssigned);
///profile info fetcher

Router.get("/profile", profile);

//updating profile info

Router.post("/update-profile", updateProfile);

//list of assigned

Router.get("/jobs", employeeJobList);

//in progress jobs

Router.get("/in-progress", InProgressEmployee);

//accept a job assigned

Router.post("/accept", acceptJob);

//update job status
Router.post("/update-job", updateJobStatus);
export default Router;
