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
