import express from "express";
import {
  getallproducts,
  addproduct,
  updateproduct,
} from "../controllers/Products.js";
import {
  authenticateMiddleware,
  adminchecker,
} from "./../midlewares/authenicationmidleware.js";

// express router
const Router = express.Router();

//fetch all products
Router.get("/allproducts", getallproducts);

// add new product
Router.put("/addproduct", authenticateMiddleware, adminchecker, addproduct);

// update a product

Router.patch(
  "/update/:productid",
  authenticateMiddleware,
  adminchecker,
  updateproduct,
);

export default Router;
