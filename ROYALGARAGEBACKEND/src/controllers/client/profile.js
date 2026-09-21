import express from "express";
import { pool } from "../../../Db.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

//view profile data
export const profileData = async (req, res) => {
  const { client_id } = req.userinfo;
  try {
    const clientdata = await pool.query(
      `SELECT email,first_name,second_name,last_name,phonenumber,county ,city,street , id, client.client_id 
      FROM client LEFT JOIN address ON address.client_id = client.client_id  WHERE client.client_id = $1 `,
      [client_id],
    );

    const results = clientdata.rows.reduce((acc, item) => {
      if (!acc.client_id) {
        acc.client_id = item.client_id;
        acc.client_info = {
          first_name: item.first_name,
          second_name: item.second_name,
          last_name: item.last_name,
          phone_number: item.phonenumber,
          email: item.email,
          address: [],
        };
      }

      if (acc.client_id === item.client_id) {
        acc.client_info.address.push({
          address_id: item.id,
          county: item.county,
          city: item.city,
          street: item.street,
        });
      }
      return acc;
    }, {});

    res.status(200).json({ success: true, data: results });
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
  const { first_name, second_name, last_name, phone_number, email } = req.body;

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
      .json({ success: true, message: "profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// adding address info
export const newAddress = async (req, res) => {
  const { county, city, street } = req.body;
  const { client_id } = req.userinfo;
  console.log(client_id);

  if (!client_id) {
    return res.json({ success: false, message: "server error missing info" });
  }
  try {
    const AddressExists = await pool.query(
      "SELECT * FROM address WHERE client_id=$1 AND county=$2 AND city =$3 AND street =$4 ",
      [client_id, county, city, street],
    );
    if (AddressExists.rows.length > 0) {
      return res.json({ success: false, message: "address already exists" });
    }
    const address = await pool.query(
      "INSERT INTO  address (county ,city, street,client_id)  VALUES ($1,$2,$3,$4) RETURNING * ",
      [county, city, street, client_id],
    );
    res
      .status(200)
      .json({ success: true, message: "address added  successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
