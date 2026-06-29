import express from "express";
import { pool } from "../../Db.js";

const app = express();

// getting all products
const getallproducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM Products ");

    res.status(201).json(products.rows);
  } catch (error) {
    console.log(error.message);
  }
};
// geting a single product by id
const getsingleproduct = (req, res) => {};

// adding items

const addproduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    product_discount,
    product_image,
    product_category,
  } = req.body;

  try {
    //if(product_name || product_price || product_description|| product_discount || product_image || product_category){}

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

export default { getallproducts, getsingleproduct, addproduct };
