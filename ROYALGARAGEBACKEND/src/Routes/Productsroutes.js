import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import {
  authenticateMiddleware,
  adminChecker,
} from "./../midlewares/authenicationmidleware.js";

// express router
const Router = express.Router();

//fetch all products
Router.get("/all-products", getAllProducts);

// add new product
Router.put("/add-product", authenticateMiddleware, adminChecker, addProduct);

// update a product

Router.patch(
  "/update/:productid",
  authenticateMiddleware,
  adminChecker,
  updateProduct,
);
//delete a product
Router.delete(
  "/delete/:product_id",
  authenticateMiddleware,
  adminChecker,
  deleteProduct,
);
//update product Quantity

// Router.patch();

export default Router;
