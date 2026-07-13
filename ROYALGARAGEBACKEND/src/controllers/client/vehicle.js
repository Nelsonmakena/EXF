import express from "express";
import { pool } from "../../../Db.js";

/// adding a new vehicle

export const addVehicle = async (req, res) => {
  const { client_id } = req.userinfo;
  const { vehicle_model, vehicle_brand, vehicle_color, liscence_plate } =
    req.body;
  console.log(client_id);

  // first we check if the vehcile the client is tring to add already exist  we chek by liscence plate

  const existingVehicle = await pool.query(
    "SELECT * FROM vehicle WHERE liscence_plate = $1",
    [liscence_plate],
  );

  if (existingVehicle.rows != 0) {
    return res.json({ success: false, message: "vehicle already registered" });
  }

  try {
    const newVehicle = await pool.query(
      "INSERT INTO vehicle (vehicle_model, vehicle_brand, vehicle_color, liscence_plate,client_id ) VALUES($1,$2,$3,$4,$5)",
      [vehicle_model, vehicle_brand, vehicle_color, liscence_plate, client_id],
    );
    res
      .status(200)
      .json({ success: true, message: "vehicle added succesefull" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// view all client registered vehicles

export const getVehicles = async (req, res) => {
  const { client_id } = req.userinfo;

  try {
    const vehicle = await pool.query(
      "SELECT * FROM vehicle WHERE client_id = $1",
      [client_id],
    );
    res.status(200).json({
      success: true,
      message: "vehicle list ",
      data: vehicle.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

///client removing a vehicle

export const deleteVehicle = async (req, res) => {
  const { client_id } = req.userinfo;
  const { vehicle_id } = req.body;

  try {
    const deletecVehicle = await pool.query(
      "DELETE  FROM vehicle WHERE vehicle_d = $1",
      [vehicle_id],
    );
    res.status(200).json({
      success: true,
      message: "vehicle removed succecssfully  ",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
