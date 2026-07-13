import { pool } from "../../../Db.js";

// common end point for updating worker profile settings

//geting profile info

export const profile = async (req, res) => {
  const { employee_id } = req.userinfo;
  console.log(employee_id);

  try {
    const employee = await pool.query(
      "SELECT * FROM employee WHERE employee_id = $1",
      [employee_id],
    );
    res.status(200).json({ succes: true, data: employee.rows });
  } catch (error) {
    console.log(error.message);
  }
};

// update profile by default the admin only registers email nad pasword

export const updateprofile = async (req, res) => {};
