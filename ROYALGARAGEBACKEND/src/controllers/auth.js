import express from "express";
import { pool } from "../../Db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";
const salt = bcrypt.genSaltSync(10);

/// adding a new user

export const addUser = async (req, res) => {
  const {
    first_name,
    second_name,
    last_name,
    email,
    phonenumber,
    password,
    address,
  } = req.body;

  const hashpswd = bcrypt.hashSync(password, salt);

  /// check whether the user exists

  const existinguser = await pool.query(
    "SELECT email FROM client WHERE email = $1   ",
    [email],
  );
  if (existinguser.rows.length !== 0) {
    return res.json({ success: false, message: "user alerdy exits " });
  }

  /// adding the user to the db
  try {
    const newuser = await pool.query(
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
    res.status(200).json({ success: true, message: "regirstation complete" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login existing user

export const getUserinfo = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await pool.query("SELECT * FROM client WHERE email= $1 ", [
      email,
    ]);
    if (user.rows.length == 0) {
      return res.json({
        success: "false",
        message: "user doesnot exisit try again ",
      });
    }

    if (bcrypt.compareSync(password, user.rows[0].pswdkey)) {
      /// creating user token
      const accesToken = jwt.sign(
        {
          user_id: user.rows[0].client_id,
          role: "client",
        },
        ENV.JWT_SECERECT_KEY,
        { expiresIn: "60m" },
      );
      res.status(200).json({
        success: true,
        message: "logged in succefull",
        token: accesToken,
      });
    } else {
      res.json({ success: false, message: "wrong info " });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// admin adding workers

export const addWorker = async (req, res) => {
  const { email, password } = req.body;

  //checking if aleady worker email is reisterd to the system
  const exsitingWorker = await pool.query(
    "SELECT email FROM employee WHERE email=$1",
    [email],
  );

  // exit if useremail is already registered
  if (exsitingWorker.rows.length !== 0) {
    return res.json({ success: false, message: "worker already registered" });
  }
  const dbpasword = bcrypt.hashSync(password, salt);
  try {
    const worker = await pool.query(
      "INSERT INTO employee (email,pswd_key) VALUES ($1,$2) ",
      [email, dbpasword],
    );
    res.status(200).json({ success: true, message: "succefully added " });
  } catch (error) {
    console.log(error.message);
  }
};

// worker login

export const worker = async (req, res) => {
  const { email, password } = req.body;
  try {
    /// checking if user exist and also pasoced
    const existingWorker = await pool.query(
      "SELECT * FROM employee WHERE email = $1",
      [email],
    );
    if (
      existingWorker.rows.length !== 0 &&
      bcrypt.compareSync(password, existingWorker.rows[0].pswd_key)
    ) {
      res.json({ success: true, message: "logged in sucefully" });
    } else {
      res.json({ success: false, message: "email or pasword is incorect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// super admin login
export const admin = async (req, res) => {
  const { email, password } = req.body;
};
