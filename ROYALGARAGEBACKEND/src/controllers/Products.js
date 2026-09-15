import express from "express";
import { pool } from "../../Db.js";

// getting all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM Products ");

    res.status(201).json({ success: true, data: products.rows });
  } catch (error) {
    console.log(error.message);
  }
};
// getting a single product by id
const getSingleProduct = (req, res) => {};

// adding items  post method

export const addProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    product_discount,
    product_image,
    product_category,
  } = req.body;

  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({ success: "false", message: "null info" });
    }
    const newProduct = await pool.query(
      "INSERT  INTO products( product_name,product_price,product_description, product_discount,product_image,product_category )  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        product_name,
        product_price,
        product_description,
        product_discount,
        product_image,
        product_category,
      ],
    );
    if (newProduct.rows.length === 0) {
      return res.json({ success: false, message: "product cant be added" });
    }
    res
      .status(201)
      .json({ success: true, message: "product added successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

/// update a product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const {
    product_name,
    product_price,
    product_description,
    product_discount,
    product_image,
    product_category,
  } = req.body;

  try {
    const updatedProduct = await pool.query(
      "UPDATE products SET product_name = $1, product_price = $2, product_description = $3, product_discount = $4, product_category = $5, product_image = $6 WHERE product_id = $7 RETURNING *",
      [
        product_name,
        product_price,
        product_description,
        product_discount,
        product_category,
        product_image,
        productId,
      ],
    );
    if (updatedProduct.rows.length === 0) {
      return res.json({ success: false, message: "product not found " });
    }
    res
      .status(200)
      .json({ success: true, message: "success product updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

//deleting
export const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  if (!product_id) {
    return res.json({ message: "invalid product id " });
  }
  try {
    const removeProduct = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [product_id],
    );
    if (removeProduct.rows.length === 0) {
      return res.json({ success: false, message: "product not found " });
    }
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

///adding new inventory

export const newInventory = async (req, res) => {
  const { product_id } = req.body;
  if (!product_id) {
    return res.json({ message: "invalid product id " });
  }
  try {
    const checkInventory = await pool.query(
      "SELECT * FROM inventory WHERE product_id = $1",
      [product_id],
    );
    if (checkInventory.rows.length > 0) {
      return res.json({
        success: false,
        message: "inventory record already exists ",
      });
    }
    const newInv = await pool.query(
      "INSERT INTO inventory (product_id) VALUES ($1) RETURNING *",
      [product_id],
    );
    if (newInv.rows.length === 0) {
      return res.json({
        success: false,
        message: "inventory of product cant be added ",
      });
    }
    res.status(200).json({
      success: true,
      message: "inventory created ",
      data: newInv.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//adding a stock

export const addStock = async (req, res) => {
  const { inventory_id, stock, supplier } = req.body;

  if (!inventory_id) {
    return res.json({ message: "invalid inventory " });
  }

  try {
    const newStock = await pool.query(
      "INSERT INTO stock (inventory_id,stock,supplier ) VALUES ($1,$2,$3) RETURNING *",
      [inventory_id, stock, supplier],
    );
    if (newStock.rows.length === 0) {
      return res.json({
        success: false,
        message: "stock cant be added",
      });
    }
    res.status(200).json({
      success: true,
      message: "newStock added ",
      data: newStock.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
// fetch product stock

export const productInventory = async (req, res) => {
  try {
    const inventory = await pool.query(
      "SELECT * FROM inventory LEFT JOIN stock ON inventory.inventory_id = stock.inventory_id JOIN products ON products.product_id=inventory.product_id",
    );

    res.status(200).json({
      success: true,
      data: inventory.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const SingleProductInventory = async (req, res) => {
  const { inventory_id } = req.params;
  if (!inventory_id) {
    return res.json({ success: false, message: "invalid inventory id" });
  }

  try {
    const inventory = await pool.query(
      "SELECT * FROM stock JOIN inventory ON inventory.inventory_id = stock.inventory_id JOIN products ON products.product_id=inventory.product_id WHERE stock.inventory_id =$1",
      [inventory_id],
    );

    res.status(200).json({
      success: true,
      data: inventory.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
