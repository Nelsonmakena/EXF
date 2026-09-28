import { pool } from "../../../Db.js";
import bcrypt from "bcryptjs";

// common end point for updating worker profile settings

//getting profile info

export const profile = async (req, res) => {
  const { employee_id } = req.userinfo;

  try {
    const employee = await pool.query(
      "SELECT first_name,second_name,last_name,phone_number,address,email FROM employee WHERE employee_id = $1",
      [employee_id],
    );
    res.status(200).json({ success: true, data: employee.rows });
  } catch (error) {
    console.log(error.message);
  }
};

// update profile by default the admin only registers email and role

export const updateProfile = async (req, res) => {
  const { employee_id, account_id } = req.userinfo;
  if (!employee_id && !account_id) {
    return res.json({ success: false, message: "server error " });
  }
  const { first_name, second_name, last_name, phoneNumber, address } = req.body;
  try {
    const updatedProfile = await pool.query(
      "INSERT INTO employee (first_name,second_name,last_name, phone_number,address ) values($1,$2,$3,$4,$5) WHERE employee_id = $4 RETURNING *",
      [first_name, second_name, last_name, phoneNumber, address, employee_id],
    );
    res
      .status(200)
      .json({ success: true, message: "profile updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};

//update password

export const updatePassword = async (req, res) => {
  const { account_id, employee_id } = req.userinfo;
  const { password, newPassword } = req.body;
  if (!account_id) {
    return res.json({ success: false, message: "server error " });
  }

  try {
    const findAccount = await pool.query(
      "SELECT password_hash FROM accounts WHERE account_id = $1",
      [account_id],
    );

    if (bcrypt.compareSync(password, findAccount.rows[0].password_hash)) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      await pool.query("INSERT INTO accounts (password_hash ) VALUE ($1)", [
        newPasswordHash,
      ]);
      res.status(200).json({ success: true, message: "password changed" });
    } else {
      res.json({ success: false, message: "passwords don't match" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};
