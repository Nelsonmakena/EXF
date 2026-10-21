import express from "express";
import {
  newAccountRole,
  accountRoles,
  deleteAccountRole,
  updateRoleInfo,
  addNewRole,
  removeRole,
  roleList,
  accountsList,
  accountAltering,
  singleAccountView,
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
Router.get(
  "/account-role",
  authenticateMiddleware,
  CommonChecker,
  accountRoles,
);
Router.get("/employee-roles", authenticateMiddleware, CommonChecker, roleList);

//
Router.use(authenticateMiddleware, superAdminChecker);
//roles
//adding new account role
Router.post("/account-role", newAccountRole);
//removing account role
Router.delete("/account-role/:account_role_id", deleteAccountRole);
//updating a role
Router.patch("/account-role/:account_role_id", updateRoleInfo);
Router.post("/employee-role", addNewRole);
Router.delete("/employee-role/:role_id", removeRole);

//accounts
//deactivate an account
Router.patch("/account", accountAltering);
//list of accounts
Router.get("/accounts", accountsList);
//single account info
Router.get("/account/:account_id", singleAccountView);

//new admin
Router.post("/new-admin", newAdmin);
export default Router;
