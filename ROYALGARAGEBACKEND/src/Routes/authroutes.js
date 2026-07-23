import express from "express";
import {
  addUser,
  getUserinfo,
  worker,
  admin,
  logOut,
} from "../controllers/auth.js";
import { authenicateMiddleware } from "../midlewares/authenicationmidleware.js";

const Router = express.Router();

//add a new user local user

Router.post("/register", addUser);

// get user for autheniction // user login

Router.post("/login", getUserinfo);

// admin login
Router.post("/admin", admin);

// admin to add a new worker to the system
//Router.post("/addworker", addWorker);

// worker login

Router.post("/workerlogin", worker);

/// checking if user is athenctaed and looged in

Router.get("/checkauth", authenicateMiddleware, (req, res) => {
  const new_userinfo = req.userinfo;
  res
    .status(200)
    .json({ success: true, message: "authenicated", new_userinfo });
});

//loggin out
Router.get("/logout", logOut);

export default Router;
