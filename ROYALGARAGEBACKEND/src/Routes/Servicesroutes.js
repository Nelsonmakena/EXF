import {
  getallservices,
  addService,
  updateService,
} from "../controllers/Services.js";
import express from "express";

const Router = express.Router();

Router.get("/all-services", getallservices);
Router.post("/add-service", addService);
Router.put("/update-service/:service_id", updateService);
export default Router;
