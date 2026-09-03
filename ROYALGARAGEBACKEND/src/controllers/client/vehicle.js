import express from "express";
import { pool } from "../../../Db.js";

/// adding a new vehicle

export const addVehicle = async (req, res) => {
  const { client_id } = req.userinfo;
  const { vehicle_model, vehicle_brand, vehicle_color, license_plate } =
    req.body;

  if (Object.keys(req.body).length === 0) {
    return res
      .status(401)
      .json({ success: false, message: "all fields must be filled" });
  }

  // first we check if the vehicle the client is trying to add already exist  we check by license plate

  const existingVehicle = await pool.query(
    "SELECT license_plate FROM vehicle WHERE license_plate = $1",
    [license_plate],
  );

  if (existingVehicle.rows != 0) {
    return res.json({ success: false, message: "vehicle already registered" });
  }

  try {
    const newVehicle = await pool.query(
      "INSERT INTO vehicle (vehicle_model, vehicle_brand, vehicle_color, license_plate,client_id ) VALUES($1,$2,$3,$4,$5) RETURNING * ",
      [vehicle_model, vehicle_brand, vehicle_color, license_plate, client_id],
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
      "SELECT license_plate,vehicle_brand,vehicle_color,vehicle_model,appointment_day,vehicle.vehicle_id,service_id  FROM vehicle LEFT JOIN jobs ON jobs.vehicle_id=vehicle.vehicle_id LEFT JOIN job_services ON jobs.job_id=job_services.job_id WHERE client_id = $1",
      [client_id],
    );
    const results = vehicle.rows.reduce((acc, item) => {
      let findVehicle = acc.find(
        (vehicle) => vehicle.vehicle_id === item.vehicle_id,
      );

      if (!findVehicle) {
        findVehicle = {
          vehicle_id: item.vehicle_id,
          appointment_day: item.appointment_day,
          details: {
            model: item.vehicle_model,
            color: item.vehicle_color,
            brand: item.vehicle_brand,
            plate: item.license_plate,
          },
          services: [],
        };

        acc.push(findVehicle);
      }

      if (item.service_id) {
        findVehicle.services.push({
          service_id: item.service_id,
          service_name: item.service_name,
        });
      }

      return acc;
    }, []);
    res.status(200).json({
      success: true,
      message: "vehicle list ",
      data: results,
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
    return res.json({ success: false, message: "access denied" });
  }

  try {
    const checkVehicle = await pool.query(
      "SELECT * FROM  vehicle WHERE vehicle_id=$1 AND client_id = $2",
      [vehicle_id, client_id],
    );
    if (checkVehicle.rows.length == 0) {
      return res.json({ success: false, message: "vehicle not found" });
    }
    //first check you cannot remove a vehicle with active job from the system

    const delet = await pool.query(
      "DELETE FROM vehicle WHERE vehicle_id = $1 AND client_id = $2 AND NOT EXISTS (SELECT 1 FROM jobs WHERE  jobs.vehicle_id = vehicle.vehicle_id AND jobs.job_current_status <> 'completed' )  RETURNING * ",
      [vehicle_id, client_id],
    );
    if (delet.rows.length == 0) {
      return res.json({
        success: false,
        message: "vehicle cannot be removed",
      });
    }
    res.status(200).json({
      success: true,
      message: "vehicle removed successfully",
      data: delet.rows[0].vehicle_id,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
