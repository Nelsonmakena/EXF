import express from "express";
import {
  authenticateMiddleware,
  adminChecker,
} from "../middlewares/authenicationmidleware.js";
import {
  roleList,
  workers,
} from "../controllers/admin/Management/Wokermamagment.js";

import { totalNumbers } from "../controllers/dashboarb.js";

import {
  AllJobs,
  assignJob,
  inProgress,
  jobDetails,
} from "../controllers/jobs.js";

import { Clients, clientInfo } from "./../controllers/client/clientinfo.js";

import { addWorker } from "../controllers/auth.js";

const Router = express.Router();

Router.use(authenticateMiddleware, adminChecker);

// these are protected admin routes

//dashboard numbers
Router.get("/dashboard", totalNumbers);

/// adding worker roles
// Router.post("/new-role", addNewRole);

/// displaying the role list
Router.get("/role-list", roleList);

//removing a role from the system
// Router.delete("/remove-role", removeRole);

// adding workers to the system
Router.post("/add-worker", addWorker);

// view of all workers
Router.get("/workers", workers);

// view of jobs non assigned
Router.get("/jobs-list", AllJobs);

//view of inprogress jobs
Router.get("/in-progress", inProgress);

// assigning of jobs
Router.put("/assign", assignJob);

//job details
Router.get("/job-details/:job_id", jobDetails);

//client list
Router.get("/clients", Clients);

//single client info
Router.get("/client/:client_id", clientInfo);
export default Router;
