import { pool } from "../../../Db.js";

// common end point for updating worker profile settings

//geting profile info

export const profile = async (req, res) => {
  const { employee_id } = req.userinfo;
  console.log(employee_id);

  try {
    const employee = await pool.query(
      "SELECT first_name,second_name,last_name,phonenumber,address,email FROM employee WHERE employee_id = $1",
      [employee_id],
    );
    res.status(200).json({ succes: true, data: employee.rows });
  } catch (error) {
    console.log(error.message);
  }
};

// update profile by default the admin only registers email and pasword

export const updateProfile = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "server error missing info" });
  }
  if (!req.body) {
    return res.json({ success: false, message: "all filled are required" });
  }
  const { first_name, second_name, lastname, phone_number } = req.body;

  const hashpswd = bcrypt.hashSync(password, salt);

  try {
    const updatedprofile = await pool.query(
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
    res
      .status(200)
      .json({ success: true, message: "profile updated succefully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
