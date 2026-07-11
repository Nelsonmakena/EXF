import express from "express";
import { pool } from "../../../Db.js";

//veiw profile data
export const profiledata = async (req, res) => {
  const { user_id, role } = req.userinfo;
  try {
    const clientdata = await pool.query(
      "SELECT * FROM client WHERE client_id = $1 ",
      [user_id],
    );
    res.json(clientdata.rows[0]);
    console.log(clientdata.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// update profile data

export const updateProfile = async (req, res) => {};
