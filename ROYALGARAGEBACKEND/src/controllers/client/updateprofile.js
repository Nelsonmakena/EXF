import express from "express";
import { pool } from "../../../Db.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
//veiw profile data
export const profileData = async (req, res) => {
  const { client_id, role } = req.userinfo;
  try {
    const clientdata = await pool.query(
      "SELECT address,email,first_name,second_name,last_name,phonenumber FROM client WHERE client_id = $1 ",
      [client_id],
    );
    res.json({ success: true, data: clientdata.rows[0] });
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};

// update profile data

export const updateProfile = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    return res.json({ success: false, message: "server error missing info" });
  }
  const { first_name, second_name, lastname, phone_number, email, pasword } =
    req.body;

  const hashpswd = bcrypt.hashSync(password, salt);
  if (
    !first_name ||
    !second_name ||
    !lastname ||
    !phone_number ||
    !email ||
    !pasword
  ) {
    return res.json({ success: false, message: "all filled are required" });
  }
  try {
    const updatedprofile = await pool.query(
      "INSERT INTO client (first_name,second_name,last_name, email, phonenumber,pswdkey ,address ) values($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        first_name,
        second_name,
        last_name,
        email,
        phonenumber,
        hashpswd,
        address,
      ],
    );
    res
      .status(200)
      .json({ success: true, message: "profile updated succefully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
