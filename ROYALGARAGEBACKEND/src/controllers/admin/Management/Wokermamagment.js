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
      "SELECT first_name,second_name,last_name, email,role_name ,employee.employee_id ,job_services.job_services_id,service_name  FROM employee JOIN roles on roles.role_id = employee.role_id LEFT JOIN service_assignment ON service_assignment.employee_id = employee.employee_id LEFT JOIN job_services ON job_services.job_services_id=service_assignment.job_services_id LEFT JOIN services ON job_services.service_id = services.service_id",
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
    res
      .status(200)
      .json({ success: true, data: results, raw: allWorkers.rows });
  } catch (error) {
    console.log(error.message);
  }
};
