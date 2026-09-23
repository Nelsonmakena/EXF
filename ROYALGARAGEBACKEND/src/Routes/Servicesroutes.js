import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../controllers/Services.js";
import express from "express";

import {
  authenticateMiddleware,
  adminChecker,
} from "../middlewares/authenicationmidleware.js";

const Router = express.Router();

Router.get("/all-services", getServices);
Router.use(authenticateMiddleware, adminChecker);
Router.put("/add-service", addService);
Router.put("/update-service/:service_id", updateService);
Router.delete("/delete/:service_id", deleteService);
export default Router;
