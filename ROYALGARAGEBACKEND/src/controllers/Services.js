import express from "express";
import { pool } from "../../Db.js";

export const getallservices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM services ");
    res.status(201).json(services.rows);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};
export const addService = async (req, res) => {
  const {
    service_name,
    service_price,
    service_description,
    service_discount,
    service_category,
    service_image,
  } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.json("null info ");
  }
  try {
    const newService = await pool.query(
      "INSERT INTO services (service_name , service_price , service_description , service_discount , service_category ,service_image  )  VALUES ($1,$2,$3,$4,$5,$6) RETURNING *   ",
      [
        service_name,
        service_price,
        service_description,
        service_discount,
        service_category,
        service_image,
      ],
    );
    res.status(200).json(newService.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};
export const updateService = async (req, res) => {};
