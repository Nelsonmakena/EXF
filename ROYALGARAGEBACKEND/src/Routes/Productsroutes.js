import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  newInventory,
  addStock,
  productInventory,
  SingleProductInventory,
} from "../controllers/Products.js";
import {
  authenticateMiddleware,
  adminChecker,
} from "./../midlewares/authenicationmidleware.js";

// express router
const Router = express.Router();

//fetch all products
Router.get("/all-products", getAllProducts);

Router.use(authenticateMiddleware, adminChecker);
// add new product
Router.put("/add-product", addProduct);

// update a product

Router.patch("/update/:productId", updateProduct);
//delete a product
Router.delete(
  "/delete/:product_id",

  deleteProduct,
);

//new inventory record
Router.put("/inventory", newInventory);

// all product invntory
Router.get("/inventory", productInventory);

//single product inventory
Router.get("/inventory/:inventory_id", SingleProductInventory);

//new stock
Router.put("/stock", addStock);

export default Router;
