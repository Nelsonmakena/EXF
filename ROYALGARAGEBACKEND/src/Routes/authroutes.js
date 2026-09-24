import express from "express";
import {
  addUser,
  login,
  admin,
  workerLogin,
  logOut,
} from "../controllers/auth.js";
import { authenticateMiddleware } from "../middlewares/authenicationmidleware.js";

const Router = express.Router();

//new user register

Router.post("/register", addUser);

// client  login

Router.post("/login", login);

// employee login
Router.post("/employee", workerLogin);

// system admin login
Router.post("/admin", admin);

/// checking if user is authenticated and logged in

Router.get("/check-auth", authenticateMiddleware, (req, res) => {
  const data = req.userinfo;
  res
    .status(200)
    .json({ success: true, message: "authenticated", data: req.userinfo });
});

//login out
Router.get("/logout", logOut);

export default Router;
