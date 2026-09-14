import express from "express";
import { pool } from "../../Db.js";

export const getServices = async (req, res) => {
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

//protected route only admin privileges
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
    if (newService.rows.length === 0) {
      return res.json({ success: false, message: "service cant be added" });
    }
    res
      .status(200)
      .json({ success: true, message: "service added successfully " });
    console.log(newService.rows[0]);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

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
      .json({ success: true, message: "service updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteService = async (req, res) => {
  const { service_id } = req.params;
  if (!service_id) {
    return res.json({ message: "invalid service id " });
  }
  try {
    const checkService = await pool.query(
      "SELECT * FROM job_services WHERE service_id = $1",
      [service_id],
    );
    if (checkService.rows.length !== 0) {
      return res.json({
        success: false,
        message: "service cannot be removed ",
      });
    }
    const removeService = await pool.query(
      "DELETE FROM services WHERE service_id = $1 RETURNING *",
      [service_id],
    );
    if (removeService.rows.length === 0) {
      return res.json({ success: false, message: "product not found " });
    }
    res.status(200).json({
      success: true,
      message: "service deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
