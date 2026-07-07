import express from "express";
import {
  getallproducts,
  addproduct,
  updateproduct,
} from "../controllers/Products.js";

// express router
const Router = express.Router();

//fetch all products
Router.get("/allproducts", getallproducts);

// add new product
Router.post("/addproduct", addproduct);

// update a product

Router.put("/update/:productid", updateproduct);

export default Router;
