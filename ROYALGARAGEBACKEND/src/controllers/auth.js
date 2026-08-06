import express from "express";
import { pool } from "../../Db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";

const salt = bcrypt.genSaltSync(10);

function formatName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/// adding a new user client

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

  if (!req.body) {
    return console.log("all fields are required");
  }

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

// login existing user (client)

export const getUserinfo = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (Object.keys(req.body).length == 0) {
    console.log(req.body);
    return res.json({ success: false, message: "all fileds are required" });
  }

  try {
    const user = await pool.query("SELECT * FROM client WHERE email= $1 ", [
      email,
    ]);
    if (user.rows.length == 0) {
      return res.json({
        success: false,
        message: "user doesnot exisit try again ",
      });
    }

    if (bcrypt.compareSync(password, user.rows[0].pswdkey)) {
      /// creating user token
      const accesToken = jwt.sign(
        {
          client_id: user.rows[0].client_id,
          first_name: user.rows[0].first_name,
          last_name: user.rows[0].last_name,
          role: "client",
        },
        ENV.JWT_SECERECT_KEY,
        { expiresIn: "60m" },
      );

      res.cookie("token", accesToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in succefull",
        user: {
          first_name: user.rows[0].first_name,
          last_name: user.rows[0].last_name,
          role: "client",
        },
      });
    } else {
      res.json({ success: false, message: "wrong info " });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// worker login

export const worker = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (Object.keys(req.body).length == 0) {
    console.log(req.body);
    return res.json({ success: false, message: "all fileds are required" });
  }

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
      const accesToken = jwt.sign(
        {
          employee_id: existingWorker.rows[0].employee_id,
          role: "worker",
        },
        ENV.JWT_SECERECT_KEY,
        { expiresIn: "60m" },
      );
      res.cookie("token", accesToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in succefull",
        user: {
          first_name: existingWorker.rows[0].first_name,
          last_name: existingWorker.rows[0].last_name,
          role: "worker",
        },
      });
    } else {
      res.json({ success: false, message: "email or pasword is incorect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// super admin login
export const admin = async (req, res) => {
  const { username, password } = req.body;
  if (Object.keys(req.body).length == 0) {
    return console.log("empty fileds");
  }

  try {
    const existingAdmin = await pool.query(
      "SELECT * FROM admin WHERE username= $1 ",
      [username],
    );

    if (existingAdmin.rows.length == 0) {
      return console.log("user not found ");
    }

    if (existingAdmin.rows[0].password == password) {
      const accesToken = jwt.sign(
        {
          admin_id: existingAdmin.rows[0].admin_id,
          role: "admin",
        },
        ENV.JWT_SECERECT_KEY,
        { expiresIn: "60m" },
      );
      res.cookie("token", accesToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in succefull",
        name: "Admin",
        role: "admin",
      });
    } else {
      return res.json({
        success: false,
        message: "email or pasword is incorect",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// login out
export const logOut = async (req, res) => {
  res.clearCookie("token").json({ success: true, message: "logged out " });
};
