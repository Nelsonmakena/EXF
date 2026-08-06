import { pool } from "../../../../Db.js";
import express from "express";
import { ENV } from "../../../../env.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

//adding a new role
export const addNewRole = async (req, res) => {
  const { role_name, role_descprtion } = req.body;
  console.log("hello");

  if (Object.keys(req.body).length == 0) {
    return res
      .status(401)
      .json({ success: false, message: "all fileds must be filled" });
  }

  try {
    const add = await pool.query(
      "INSERT INTO roles(role_name,role_descprtion) VALUES ($1,$2) RETURNING *",
      [role_name, role_descprtion],
    );
    res.status(200).json({
      success: true,
      message: "role added succesefull",
      data: add.rows[0],
    });
  } catch (error) {
    console.log(error.message);
  }
};

//displaying roles

export const roleList = async (req, res) => {
  try {
    const list = await pool.query("SELECT * FROM roles");
    res.status(200).json({
      success: true,
      data: list.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
//deleting role

export const removeRole = async (req, res) => {
  const { role_id } = req.body;
  try {
    const remove = await pool.query(
      "DELETE FROM role where role_id = $1 RETURNING * ",
      [role_id],
    );
    res.status(200).json({
      success: true,
      message: "role removed succesefull",
      data: remove.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// admin adding workers

export const addWorker = async (req, res) => {
  const { email, role_id } = req.body;
  const password = ENV.DEFAULT_PASSWORD;

  const exsitingWorker = await pool.query(
    "SELECT email FROM employee WHERE email=$1",
    [email],
  );

  if (exsitingWorker.rows.length !== 0) {
    return res.json({ success: false, message: "worker already registered" });
  }
  const dbpasword = bcrypt.hashSync(password, salt);
  try {
    const worker = await pool.query(
      "INSERT INTO employee (email,pswd_key,role_id) VALUES ($1,$2,$3) ",
      [email, dbpasword, role_id],
    );
    res.status(200).json({ success: true, message: "succefully added " });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// fethcing all worker list
export const workers = async (req, res) => {
  try {
    const allworkers = await pool.query(
      "SELECT first_name,last_name,postion,second_name,employee_id  FROM employee  ",
    );
    res.status(200).json({ success: true, data: allworkers.rows });
  } catch (error) {
    console.log(error.message);
  }
};

//list of workers with no assigned jobs
export const nonAssignedWorkerList = async (req, res) => {
  try {
    const list = await pool.query(
      "SELECT * FROM employee CENTER JOIN jobsallocation ON jobsallocation.employee_id = employee.employee_id ",
    );
    res.status(200).json({ success: true, data: list.rows });
  } catch (error) {
    console.log(error.message);
  }
};
