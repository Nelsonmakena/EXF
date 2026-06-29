import express from "express";
import { pool } from "../../Db.js";

const app = express;

export const getallservices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM services ");
    res.status(201).json(products.rows);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};
