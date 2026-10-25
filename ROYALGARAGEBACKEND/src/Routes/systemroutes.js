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
import { newPosition, positionList } from "../controllers/Worker/worker.js";
import {
  authenticateMiddleware,
  superAdminChecker,
  CommonChecker,
} from "../middlewares/authenicationmidleware.js";
import { newAdmin } from "../controllers/auth.js";

const Router = express.Router();
//common routes shared between admin and system
//list of system accounts
Router.get(
  "/account-roles",
  authenticateMiddleware,
  CommonChecker,
  accountRoles,
);
Router.get("/employee-roles", authenticateMiddleware, CommonChecker, roleList);
Router.get("/positions", authenticateMiddleware, CommonChecker, positionList);

//
Router.use(authenticateMiddleware, superAdminChecker);
//roles
//adding new account role
Router.post("/account-role", newAccountRole);
//removing account role
Router.delete("/account-role/:account_role_id", deleteAccountRole);
//updating a role
Router.patch("/account-role/:account_role_id", updateRoleInfo);
//adding new employee role
Router.post("/employee-role", addNewRole);
//removing employee role
Router.delete("/employee-role/:role_id", removeRole);
//add a new employee position
Router.put("/positions", newPosition);

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
