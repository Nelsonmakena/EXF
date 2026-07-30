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

//new user reegister

Router.post("/register", addUser);

// user login

Router.post("/login", getUserinfo);

// admin login
Router.post("/admin", admin);

// worker login

Router.post("/workerlogin", worker);

/// checking if user is athenctaed and looged in

Router.get("/checkauth", authenicateMiddleware, (req, res) => {
  const user = req.userinfo;
  res
    .status(200)
    .json({ success: true, message: "authenicated", user: req.userinfo });
});

//loggin out
Router.get("/logout", logOut);

export default Router;
