import {
  getallservices,
  addService,
  updateService,
} from "../controllers/Services.js";
import express from "express";

const Router = express.Router();

Router.get("/allservices", getallservices);
Router.post("/addservice", addService);
Router.put("/updateservice/:service_id", updateService);
export default Router;
