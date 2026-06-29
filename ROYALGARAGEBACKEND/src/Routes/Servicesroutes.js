import { getallservices } from "../controllers/Services.js";
import express from "express";

const Router = express.Router();

Router.get("/allservices", getallservices);
export default Router;
