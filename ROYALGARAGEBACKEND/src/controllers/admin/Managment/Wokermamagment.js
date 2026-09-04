import { pool } from "../../../../Db.js";
import express from "express";
import { ENV } from "../../../../env.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

//adding a new role
export const addNewRole = async (req, res) => {
  const { role_name, role_descprtion } = req.body;
  if (Object.keys(req.body).length == 0) {
    return res
      .status(401)
      .json({ success: false, message: "all fields must be filled" });
  }

  try {
    const add = await pool.query(
      "INSERT INTO roles(role_name,role_descprtion) VALUES ($1,$2) RETURNING *",
      [role_name, role_descprtion],
    );
    res.status(200).json({
      success: true,
      message: "role added successfully",
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
  console.log(role_id);

  try {
    const remove = await pool.query(
      "DELETE FROM roles where role_id = $1 RETURNING * ",
      [role_id],
    );
    res.status(200).json({
      success: true,
      message: "role removed successfully",
      data: remove.rows[0],
    });
  } catch (error) {
    console.log(error.message);
  }
};

// admin adding workers

export const addWorker = async (req, res) => {
  const { email, role_id } = req.body;
  const password = ENV.DEFAULT_PASSWORD;
  console.log(req.body);

  const existingWorker = await pool.query(
    "SELECT email FROM employee WHERE email=$1",
    [email],
  );

  if (existingWorker.rows.length !== 0) {
    return res.json({ success: false, message: "worker already registered" });
  }
  const dbPassword = bcrypt.hashSync(password, salt);
  try {
    const worker = await pool.query(
      "INSERT INTO employee (email,pswd_key,role_id) VALUES ($1,$2,$3) RETURNING *",
      [email, dbPassword, role_id],
    );
    res.status(200).json({
      success: true,
      message: "successfully added ",
      data: worker.rows[0],
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// fetching all worker list
export const workers = async (req, res) => {
  try {
    const allWorkers = await pool.query(
      "SELECT first_name , second_name , last_name , role_name, service_name ,job_services_id,  employee.employee_id FROM employee JOIN roles on roles.role_id = employee.role_id LEFT JOIN job_services ON job_services.employee_id=employee.employee_id LEFT JOIN services ON job_services.service_id = services.service_id",
    );

    const results = allWorkers.rows.reduce((acc, item) => {
      const findEmployee = acc.find(
        (employee) => employee.employee_id === item.employee_id,
      );
      if (!findEmployee) {
        const newEmployee = {
          employee_id: item.employee_id,
          info: {
            first_name: item.first_name,
            second_name: item.second_name,
            last_name: item.last_name,
            email: item.email,
            role: item.role_name,
          },
          jobs: [],
        };
        acc.push(newEmployee);
      }
      const findNewEmployee = acc.find(
        (employee) => employee.employee_id === item.employee_id,
      );
      if (item.job_services_id) {
        findNewEmployee.jobs.push({
          job_services_id: item.job_services_id,
          service_name: item.service_name,
        });
      }

      return acc;
    }, []);
    results.sort((a, b) => b.jobs.length - a.jobs.length);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.log(error.message);
  }
};
