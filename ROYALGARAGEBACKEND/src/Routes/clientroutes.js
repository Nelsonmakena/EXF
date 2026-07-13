import express from "express";
import { profiledata } from "../controllers/client/updateprofile.js";
import { authenicateMiddleware } from "../midlewares/authenicationmidleware.js";
import {
  addVehicle,
  getVehicles,
  deleteVehicle,
} from "../controllers/client/vehicle.js";
const Router = express.Router();

// authenicated middleware should read authenication mildware (layer 1)

// profile updating
Router.get("/profileinfo", authenicateMiddleware, profiledata);

// adding a new vehicle
Router.post("/addvehicle", authenicateMiddleware, addVehicle);

// veiw client vehicles
Router.get("/vehicle", authenicateMiddleware, getVehicles);

// client to delete a vehicle

Router.post("/deletevehicle", authenicateMiddleware, deleteVehicle);

export default Router;
