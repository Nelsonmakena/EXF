import express from "express";

import {
  authenticateMiddleware,
  workerChecker,
} from "../midlewares/authenicationmidleware.js";

import {
  profile,
  updateProfile,
} from "./../controllers/Worker/workersettings.js";

import { employeeJobList } from "../controllers/jobs.js";
const Router = express.Router();

Router.use(authenticateMiddleware, workerChecker);

///profile info fetcher
Router.get("/profile", profile);

//updating profile info
Router.post("/update-profile", updateProfile);

//list of jobs
Router.get("/jobs", employeeJobList);
export default Router;
