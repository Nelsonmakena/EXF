import express from "express";
import {
  authenicateMiddleware,
  adminchecker,
} from "../midlewares/authenicationmidleware.js";
import {
  addWorker,
  workers,
} from "../controllers/admin/Managment/Wokermamagment.js";

import { AllJobs, assignJob, unallocatedJobs } from "../controllers/jobs.js";
const Router = express.Router();

// these are protected admin routes

// adding workes to the system

Router.post("/addworker", authenicateMiddleware, adminchecker, addWorker);

// view of all workers

Router.get("/workers", authenicateMiddleware, adminchecker, workers);

// view of all jobs in the system

Router.get("/jobslist", authenicateMiddleware, adminchecker, AllJobs);

// assigning of jobs

Router.post("/assign", authenicateMiddleware, adminchecker, assignJob);

//list of ansigned jobs

Router.get(
  "/unassinedjobs",
  authenicateMiddleware,
  adminchecker,
  unallocatedJobs,
);

export default Router;
