import express from "express";
import { pool } from "../../Db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENV } from "../../env.js";

const salt = bcrypt.genSaltSync(10);

// adding a new user client

export const addUser = async (req, res) => {
  const { first_name, second_name, last_name, email, phone_number, password } =
    req.body;

  if (!req.body) {
    return console.log("all fields are required");
  }

  const hashPassword = bcrypt.hashSync(password, salt);
  const client = await pool.connect();

  /// adding the user to the db
  try {
    await client.query("BEGIN");
    const findAccountRole = await client.query(
      "SELECT account_role_id FROM account_roles WHERE role_name = $1",
      ["client"],
    );
    //create first the account
    const newAccount = await client.query(
      "INSERT INTO accounts (password_hash , email,account_role_id) VALUES ($1,$2,$3)  RETURNING account_id",
      [hashPassword, email, findAccountRole.rows[0].account_role_id],
    );
    const accountId = newAccount.rows[0].account_id;

    // now adding the client info

    await client.query(
      "INSERT INTO client (first_name,second_name,last_name, phone_number,account_id) values($1,$2,$3,$4,$5)",
      [first_name, second_name, last_name, phone_number, accountId],
    );

    await client.query("COMMIT");
    res.status(200).json({ success: true, message: "registration complete" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);

    res.json({ success: false, message: "account could not be created " });
  } finally {
    client.release;
  }
};

///new worker

export const addWorker = async (req, res) => {
  const { email, role_id, account_role } = req.body;
  const password = ENV.DEFAULT_PASSWORD;
  const password_hash = bcrypt.hashSync(password, salt);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const newAccount = await client.query(
      "INSERT INTO accounts (password_hash ,email, accounts_role_id) VALUES ($1,$2) RETURNING account_id ",
      [password_hash, email, account_role],
    );
    const accountId = newAccount.rows[0].account_id;
    const newEmployee = await client.query(
      "INSERT INTO employee (account_id , role_id) VALUES ($1,$2)",
      [accountId, role_id],
    );
    await client.query("COMMIT");
    res.status(200).json({ success: true, message: " account created " });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.json({ success: false, message: "account could not be created " });
  } finally {
    client.release;
  }
};

// new admin

export const newAdmin = async (req, res) => {
  const { email, role_id, account_role } = req.body;
  const password = ENV.DEFAULT_PASSWORD;
  const password_hash = bcrypt.hashSync(password, salt);
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const newAccount = await client.query(
      "INSERT INTO accounts (password_hash ,email, accounts_role_id) VALUES ($1,$2) RETURNING account_id ",
      [password_hash, email, account_role],
    );
    const accountId = newAccount.rows[0].account_id;
    const newEmployee = await client.query(
      "INSERT INTO employee (account_id , role_id) VALUES ($1,$2)",
      [accountId, role_id],
    );
    await client.query("COMMIT");
    res.status(200).json({ success: true, message: " account created " });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.json({ success: false, message: "account could not be created " });
  } finally {
    client.release;
  }
};

// client  login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (Object.keys(req.body).length == 0) {
    return res.json({ success: false, message: "all fields are required" });
  }

  try {
    const response = await pool.query(
      `SELECT a.email ,a.password_hash,a.account_id,c.first_name,c.last_name, c.client_id ,a.first_time_login ,r.role_name
      FROM accounts a
       JOIN client c ON c.account_id =a.account_id 
        JOIN account_roles r ON r.account_role_id = a.account_role_id
      WHERE a.email= $1 `,
      [email],
    );
    if (response.rows.length == 0) {
      return res.json({
        success: false,
        message: "wrong info ",
      });
    }
    const user = response.rows[0];

    if (bcrypt.compareSync(password, user.password_hash)) {
      const info = {
        account_id: user.account_id,
        first_time_login: user.first_time_login,
        role: user.role_name,
        client_id: user.client_id,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      /// creating user token
      const accessToken = jwt.sign(info, ENV.JWT_SECRET_KEY, {
        expiresIn: "60m",
      });

      res.cookie("token", accessToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in successfully",
        data: info,
      });
    } else {
      res.json({ success: false, message: "wrong info " });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const workerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await pool.query(
      `SELECT a.email ,a.password_hash,a.account_id,e.first_name,e.last_name, e.employee_id ,a.first_time_login ,r.role_name
      FROM accounts a
       JOIN employee e ON e.account_id =a.account_id 
        JOIN account_roles r ON r.account_role_id = a.account_role_id
      WHERE a.email= $1 `,
      [email],
    );
    if (response.rows.length == 0) {
      return res.json({
        success: false,
        message: "wrong info ",
      });
    }
    const user = response.rows[0];

    if (bcrypt.compareSync(password, user.password_hash)) {
      const info = {
        account_id: user.account_id,
        first_time_login: user.first_time_login,
        role: user.role_name,
        employee_id: user.client_id,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      /// creating user token
      const accessToken = jwt.sign(info, ENV.JWT_SECRET_KEY, {
        expiresIn: "3hr",
      });

      res.cookie("token", accessToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in successfully",
        data: info,
      });
    } else {
      res.json({ success: false, message: "wrong info " });
    }
  } catch (error) {
    console.log(error.message);
  }
};
// super admin login
export const admin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (Object.keys(req.body).length == 0) {
    return console.log("empty fields");
  }

  try {
    const existingAdmin = await pool.query(
      "SELECT * FROM admin WHERE username= $1 ",
      [username],
    );
    if (existingAdmin.rows.length == 0) {
      return res.json({ success: false, message: "error" });
    }
    console.log(existingAdmin);

    if (bcrypt.compareSync(password, existingAdmin.rows[0].password_hash)) {
      const accessToken = jwt.sign(
        {
          admin_id: existingAdmin.rows[0].admin_id,
          role: "super_admin",
        },
        ENV.JWT_SECRET_KEY,
        { expiresIn: "3hr" },
      );
      res.cookie("token", accessToken, { httpOnly: true, secure: false });
      res.status(200).json({
        success: true,
        message: "logged in successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "username or password is incorrect",
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
