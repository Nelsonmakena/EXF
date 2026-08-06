import express from "express";
import { pool } from "../../../Db.js";

/// adding a new vehicle

export const addVehicle = async (req, res) => {
  const { client_id } = req.userinfo;
  const { vehicle_model, vehicle_brand, vehicle_color, liscence_plate } =
    req.body;

  if (Object.keys(req.body).length === 0) {
    return res
      .status(401)
      .json({ success: false, message: "all fileds must be filled" });
  }

  // first we check if the vehcile the client is tring to add already exist  we chek by liscence plate

  const existingVehicle = await pool.query(
    "SELECT liscence_plate FROM vehicle WHERE liscence_plate = $1",
    [liscence_plate],
  );

  if (existingVehicle.rows != 0) {
    return res.json({ success: false, message: "vehicle already registered" });
  }

  try {
    const newVehicle = await pool.query(
      "INSERT INTO vehicle (vehicle_model, vehicle_brand, vehicle_color, liscence_plate,client_id ) VALUES($1,$2,$3,$4,$5) RETURNING * ",
      [vehicle_model, vehicle_brand, vehicle_color, liscence_plate, client_id],
    );
    res.status(200).json({
      success: true,
      message: "vehicle added succesefull",
      data: newVehicle.rows[0],
    });
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
      "SELECT liscence_plate,vehicle_brand,vehicle_color,vehicle_model,vehicle_id  FROM vehicle WHERE client_id = $1",
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
  if (!client_id) {
    return res.json({ success: false, message: "acces denied" });
  }

  try {
    const checkVehicle = await pool.query(
      "SELECT * FROM  vehicle WHERE vehicle_id=$1",
      [vehicle_id],
    );
    if (checkVehicle.rows.length == 0) {
      return res.json({ success: false, message: "vehicle not found" });
    }
    //firts check you canot remove a vehicle with active job from the system

    const delet = await pool.query(
      "DELETE FROM vehicle WHERE vehicle_id = $1 AND client_id = $2 AND NOT EXISTS (SELECT 1 FROM jobs WHERE  jobs.vehicle_id = vehicle.vehicle_id AND jobs.job_current_status <> 'completed' )  RETURNING * ",
      [vehicle_id, client_id],
    );
    if (delet.rows.length == 0) {
      console.log(delet);

      return res.json({
        success: false,
        message: "vehicle cannot be removed",
        delet,
      });
    }
    res.status(200).json({
      success: true,
      message: "vehicle removed succecssfully",
      data: delet.data.rows,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
