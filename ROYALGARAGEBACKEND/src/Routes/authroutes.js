import express from "express";
import { addUser, getUserinfo, worker, admin } from "../controllers/auth.js";

const Router = express.Router();

//add a new user local user

Router.post("/adduser", addUser);

// get user for autheniction

Router.post("/client", getUserinfo);

// admin login
Router.post("/admin", admin);

// admin to add a new worker to the system
//Router.post("/addworker", addWorker);

// worker logi

Router.post("/worker", worker);

export default Router;
