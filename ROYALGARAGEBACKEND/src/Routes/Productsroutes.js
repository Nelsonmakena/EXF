import express from "express";
import products from "../controllers/Products.js";

// express router
const Router = express.Router();

//fetch all products
Router.get("/allproducts", products.getallproducts);

// add new product
Router.post("/addproduct", products.addproduct);

// get single product by id
Router.get("/singleproducts/:id", products.getsingleproduct);

export default Router;
