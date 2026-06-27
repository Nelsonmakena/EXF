import express from "express";
import products from "../controllers/Products.js";

// express router
const Router = express.Router();

Router.get("/allproducts", products.getallproducts);
Router.get("/singleproducts/:id", products.getsingleproduct);

export default Router;
