import express from "express";
import {
  newAccountRole,
  accountRoles,
  deleteAccountRole,
  updateRoleInfo,
  addNewRole,
  removeRole,
} from "../controllers/admin/Management/accountmanagement.js";
import {
  authenticateMiddleware,
  superAdminChecker,
  CommonChecker,
} from "../middlewares/authenicationmidleware.js";
import { newAdmin } from "../controllers/auth.js";

const Router = express.Router();
//common routes
//list of system accounts
Router.get("/account", authenticateMiddleware, CommonChecker, accountRoles);

Router.use(authenticateMiddleware, superAdminChecker);
//adding new account role
Router.post("/account", newAccountRole);

Router.delete("/account/:account_role_id", deleteAccountRole);

Router.patch("/account/:account_role_id", updateRoleInfo);

Router.post("/employee-role", addNewRole);

Router.delete("/employee-role/:role_id", removeRole);
//new admin
Router.post("/new-admin", newAdmin);
export default Router;
