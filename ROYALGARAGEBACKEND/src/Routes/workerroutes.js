import express from "express";

import {
  authenicateMiddleware,
  workerchecker,
} from "../midlewares/authenicationmidleware.js";

import {
  updateprofile,
  profile,
} from "./../controllers/Worker/workersettings.js";
const Router = express.Router();

Router.get("/profile", authenicateMiddleware, workerchecker, profile);

Router.post(
  "/updateprofile",
  authenicateMiddleware,
  workerchecker,
  updateprofile,
);

export default Router;
