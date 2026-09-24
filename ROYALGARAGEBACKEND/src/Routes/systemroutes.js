import express from "express";
import {
  newAccountRole,
  accountRoles,
} from "../controllers/admin/Management/accountmanagement.js";
import {
  authenticateMiddleware,
  superAdminChecker,
} from "../middlewares/authenicationmidleware.js";
import { newAdmin } from "../controllers/auth.js";

const Router = express.Router();
Router.use(authenticateMiddleware, superAdminChecker);
//adding new account role
Router.post("/new-account-role", newAccountRole);

Router.get("/accounts-role", accountRoles);

//new admin

Router.post("/new-admin", newAdmin);
export default Router;
