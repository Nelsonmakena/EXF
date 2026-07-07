import express from "express";
import { pool } from "../../Db.js";

// getting all products
export const getallproducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM Products ");

    res.status(201).json(products.rows);
  } catch (error) {
    console.log(error.message);
  }
};
// geting a single product by id
const getsingleproduct = (req, res) => {};

// adding items  post method

export const addproduct = async (req, res) => {
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
      return res.status(401).json({ succes: "false", message: "null info" });
    }
    const Newproduct = await pool.query(
      "INSERT  INTO products( product_name,product_price,product_descrption, product_discount,product_image,product_category )  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        product_name,
        product_price,
        product_description,
        product_discount,
        product_image,
        product_category,
      ],
    );
    res.status(201).json(Newproduct.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

/// update a product
export const updateproduct = async (req, res) => {
  const { productid } = req.params;
  const {
    product_name,
    product_price,
    product_description,
    product_discount,
    product_image,
    product_category,
  } = req.body;

  try {
    const updatedproduct = await pool.query(
      " UPDATE products SET product_name = $1, product_price = $2, product_descrption = $3, product_discount = $4, product_category = $5, product_image = $6 WHERE product_id = $7 RETURNING *",

      [
        product_name,
        product_price,
        product_description,
        product_discount,

        product_category,
        product_image,
        productid,
      ],
    );
    res.status(200).json(updatedproduct.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};
