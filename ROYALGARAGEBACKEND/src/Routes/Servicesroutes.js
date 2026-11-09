import {
  getServices,
  addService,
  updateService,
  deleteService,
  getServicesCategories,
  newServiceCategory,
} from "../controllers/Services.js";
import express from "express";

import {
  authenticateMiddleware,
  adminChecker,
  CommonChecker,
} from "../middlewares/authenicationmidleware.js";

import { newServiceCategoryRole } from "../controllers/Worker/servicesRoles.js";
const Router = express.Router();

//fetch list of all services
Router.get("/all-services", getServices);

Router.use(authenticateMiddleware, CommonChecker);

//adding a new service
Router.put("/add-service", addService);

//updating
Router.put("/update-service/:service_id", updateService);

//deleting
Router.delete("/delete/:service_id", deleteService);

//new service category
Router.put("/service-category", newServiceCategory);

//fetching the list of service categories
Router.get("/service-category", getServicesCategories);

//adding roles to service categories
Router.post("/service-category", newServiceCategoryRole);
export default Router;
