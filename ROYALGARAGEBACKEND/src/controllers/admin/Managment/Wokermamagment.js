import { pool } from "../../../../Db.js";
import express from "express";

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
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// fethcing all worker list{dashborad}
export const workers = async (req, res) => {
  try {
    const allworkers = await pool.query("SELECT * FROM employee  ");
    res.status(200).json({ success: true, data: allworkers.rows });
  } catch (error) {
    console.log(error.message);
  }
};
