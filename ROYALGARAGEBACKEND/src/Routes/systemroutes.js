import express from "express";
import {
  newAccountRole,
  accountRoles,
} from "../controllers/admin/Management/accountmanagement.js";
import {
  authenticateMiddleware,
  superAdminChecker,
} from "../middlewares/authenicationmidleware.js";

const Router = express.Router();
Router.use(authenticateMiddleware, superAdminChecker);
//adding new account role
Router.post("/new-account-role", newAccountRole);

Router.get("/accounts-role", accountRoles);
export default Router;
