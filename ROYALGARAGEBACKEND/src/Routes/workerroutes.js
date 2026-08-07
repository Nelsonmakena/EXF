import express from "express";

import {
  authenticateMiddleware,
  workerchecker,
} from "../midlewares/authenicationmidleware.js";

import {
  profile,
  updateProfile,
} from "./../controllers/Worker/workersettings.js";
const Router = express.Router();

///profile info fetcher

Router.get("/profile", authenticateMiddleware, workerchecker, profile);

Router.post(
  "/update-profile",
  authenticateMiddleware,
  workerchecker,
  updateProfile,
);

export default Router;
