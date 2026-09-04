import express from "express";
import { pool } from "../../Db.js";

export const getallservices = async (req, res) => {
  try {
    const services = await pool.query(
      "SELECT * FROM services ORDER BY service_name ASC ",
    );
    res.status(201).json({ success: true, data: services.rows });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

//protectd route only admin privilages
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
    console.log(newService.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};
//protected
export const updateService = async (req, res) => {
  const { service_id } = req.params;

  const {
    service_name,
    service_price,
    service_description,
    service_discount,
    service_category,
    service_image,
  } = req.body;
  console.log(req.body);

  try {
    const UpdatedService = await pool.query(
      "UPDATE services SET  service_name = $1, service_price = $2, service_description = $3, service_discount = $4, service_category = $5, service_image = $6 WHERE service_id = $7 RETURNING *",
      [
        service_name,
        service_price,
        service_description,
        service_discount,
        service_category,
        service_image,
        service_id,
      ],
    );
    res
      .status(200)
      .json({ succes: true, message: "service updated succesifully" });
  } catch (error) {
    console.log(error.message);
  }
};
