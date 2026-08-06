import express from "express";
import {
  authenicateMiddleware,
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
Router.use(authenicateMiddleware, adminchecker);

// these are protected admin routes

//dashboard numbers

Router.get("/dashboard", totalNumbers);

/// adding worker roles

Router.post("/newrole", addNewRole);

/// displaying the role list

Router.get("/rolelist", roleList);

//removing a role from the system
Router.delete("/removerole", removeRole);

// adding workes to the system

Router.post("/addworker", addWorker);

// view of all workers

Router.get("/workers", workers);

// view of all jobs in the system

Router.get("/jobslist", AllJobs);

// assigning of jobs

Router.patch("/assign", assignJob);

//list of ansigned jobs

Router.get("/unassinedjobs", unallocatedJobs);
// list of employess with no jobs

Router.get("/nowork", nonAssignedWorkerList);

export default Router;
