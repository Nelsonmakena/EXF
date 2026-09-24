import { pool } from "../../../../Db.js";
import express from "express";
import { ENV } from "../../../../env.js";
import bcrypt from "bcryptjs";

//displaying roles

export const roleList = async (req, res) => {
  try {
    const list = await pool.query(
      "SELECT role_name,role_description ,roles.role_id ,COUNT(employee_id)AS total_number FROM roles LEFT JOIN employee ON employee.role_id = roles.role_id  GROUP BY roles.role_id ,role_name ORDER BY role_name ASC",
    );
    res.status(200).json({
      success: true,
      data: list.rows,
    });
  } catch (error) {
    console.log(error.message);
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
  }
};
