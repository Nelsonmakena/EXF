import express from "express";
import {
  authenticateMiddleware,
  adminchecker,
} from "../midlewares/authenicationmidleware.js";
import {
  addNewRole,
  roleList,
  removeRole,
  addWorker,
  workers,
  nonAssignedWorkerList,
} from "../controllers/admin/Managment/Wokermamagment.js";

import { totalNumbers } from "../controllers/dashboarb.js";

import { AllJobs, assignJob, unallocatedJobs } from "../controllers/jobs.js";
const Router = express.Router();
// Router.use((req, res) => {
//   if (Object.keys(req.body).length === 0) {
//     return res
//       .status(401)
//       .json({ success: false, message: "all fileds must be filled" });
//   }
// });
Router.use(authenticateMiddleware, adminchecker);

// these are protected admin routes

//dashboard numbers

Router.get("/dashboard", totalNumbers);

/// adding worker roles

Router.post("/new-role", addNewRole);

/// displaying the role list

Router.get("/role-list", roleList);

//removing a role from the system
Router.delete("/remove-role", removeRole);

// adding workers to the system

Router.post("/add-worker", addWorker);

// view of all workers

Router.get("/workers", workers);

// view of all jobs in the system

Router.get("/jobs-list", AllJobs);

// assigning of jobs

Router.patch("/assign", assignJob);

//list of ansigned jobs

Router.get("/unassigned-jobs", unallocatedJobs);
// list of employess with no jobs

Router.get("/no-work", nonAssignedWorkerList);

export default Router;
