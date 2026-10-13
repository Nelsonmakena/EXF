import { pool } from "../../../../Db.js";
import express from "express";
import { ENV } from "../../../../env.js";
import bcrypt from "bcryptjs";
import { getAccountRoles } from "../../../services/commonservices.js";

//single role info

export const singleRole = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};
// fetching all worker list
export const workers = async (req, res) => {
  try {
    const allWorkers = await pool.query(
      `SELECT first_name,second_name,last_name, email,role_name ,e.employee_id ,j.job_services_id,service_name 
       FROM employee e JOIN accounts a ON a.account_id =e.account_id  
       JOIN roles r on r.role_id = e.role_id
        LEFT JOIN service_assignment s ON s.employee_id = e.employee_id
         LEFT JOIN job_services j ON j.job_services_id=s.job_services_id
          LEFT JOIN services ON j.service_id = services.service_id`,
    );

    const results = allWorkers.rows.reduce((acc, item) => {
      const findEmployee = acc.find(
        (employee) => employee.employee_id === item.employee_id,
      );
      if (!findEmployee) {
        const newEmployee = {
          employee_id: item.employee_id,
          info: {
            first_name: item.first_name ?? "",
            second_name: item.second_name ?? "",
            last_name: item.last_name ?? "",
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
    res.json({ success: false, message: "server error" });
  }
};
