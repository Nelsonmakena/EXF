import express from "express";
import {
  authenticateMiddleware,
  CommonChecker,
} from "../middlewares/authenicationmidleware.js";
import { roleList } from "../controllers/admin/Management/Wokermamagment.js";

const Router = express.Router();
Router.use(authenticateMiddleware, CommonChecker);

//fetching employee role list
Router.get("/role-list", roleList);

export default Router;
