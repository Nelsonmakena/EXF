import express from "express";
import { profiledata } from "../controllers/client/updateprofile.js";
import { authenicateMiddleware } from "../midlewares/authenicationmidleware.js";
import { addVehicle } from "../controllers/client/vehicle.js";
const Router = express.Router();

// profile updating
Router.get("/profileinfo", authenicateMiddleware, profiledata);

// adding a new vehicle
Router.post("/addvehicle", authenicateMiddleware, addVehicle);

export default Router;
