import express from "express";
import { pool } from "../../../Db.js";

/// adding a new vehicle

export const addVehicle = async (req, res) => {
  const { client_id } = req.userinfo;
  const { vehicle_model, vehicle_brand, vehicle_color, plate_number } =
    req.body;

  try {
    const newVehicle = await pool.query(
      "INSERT INTO vehicle (vehicle_model, vehicle_brand, vehicle_color, plate_number,client_id ) VALUES($1,$2,$3,$4,$5)",
      [vehicle_model, vehicle_brand, vehicle_color, plate_number, client_id],
    );
  } catch (error) {
    console.log(error.message);
  }
};
