import express from "express";

import {
  authenicateMiddleware,
  workerchecker,
} from "../midlewares/authenicationmidleware.js";

import {
  profile,
  updateProfile,
} from "./../controllers/Worker/workersettings.js";
const Router = express.Router();

///profile info fetcher

Router.get("/profile", authenicateMiddleware, workerchecker, profile);

Router.post(
  "/updateprofile",
  authenicateMiddleware,
  workerchecker,
  updateProfile,
);

export default Router;
