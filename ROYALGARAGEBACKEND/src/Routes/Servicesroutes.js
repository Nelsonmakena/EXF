import { getallservices, addService } from "../controllers/Services.js";
import express from "express";

const Router = express.Router();

Router.get("/allservices", getallservices);
Router.post("/addservice", addService);
export default Router;
