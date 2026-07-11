import express from "express";
import {
  addUser,
  getUserinfo,
  addWorker,
  worker,
} from "../controllers/auth.js";

const Router = express.Router();

//add a new user local user

Router.post("/adduser", addUser);

// get user for autheniction

Router.post("/client", getUserinfo);

// admin to add a new worker to the system
Router.post("/addworker", addWorker);

// get a worker info

Router.get("/worker", worker);

export default Router;
