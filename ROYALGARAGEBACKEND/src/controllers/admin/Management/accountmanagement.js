import { pool } from "../../../../Db.js";
import { getAccountRoles } from "../../../services/commonservices.js";

//new account role

export const newAccountRole = async (req, res) => {
  const { role_name, role_description } = req.body;

  try {
    const newRole = await pool.query(
      "INSERT INTO account_roles (role_name, role_description) VALUES ($1,$2) RETURNING * ",
      [role_name, role_description],
    );
    if (newRole.rows.length == 0) {
      return res.json({ success: false, message: "role was not added" });
    }
    res.status(200).json({
      success: true,
      message: "role added successfully",
      data: newRole.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};

//list of account roles
export const accountRoles = async (req, res) => {
  try {
    const data = await getAccountRoles();
    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};

export const deleteAccountRole = async (req, res) => {
  const { account_role_id } = req.params;
  try {
    await pool.query("DELETE FROM account_roles WHERE account_role_id = $1", [
      account_role_id,
    ]);
    res.status(200).json({
      success: true,
      message: "account role removed successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};
export const updateRoleInfo = async (req, res) => {
  const { account_role_id } = req.params;
  const { role_name, role_description } = req.body;
  try {
    await pool.query(
      "UPDATE account_roles SET role_name =$1 , role_description = $2 ",
      [role_name, role_description],
    );
    res.status(200).json({
      success: true,
      message: "role updated",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "server error" });
  }
};

//adding a new employee  role
export const addNewRole = async (req, res) => {
  const { role_name, role_description } = req.body;
  if (Object.keys(req.body).length == 0) {
    return res.json({ success: false, message: "all fields must be filled" });
  }

  try {
    const add = await pool.query(
      "INSERT INTO roles(role_name,role_description) VALUES ($1,$2) RETURNING *",
      [role_name, role_description],
    );
    if (add.rows.length == 0) {
      return res.json({ success: false, message: "role was not added" });
    }
    res.status(200).json({
      success: true,
      message: "role added successfully",
      data: add.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "role cant be added" });
  }
};

//deleting employing role

export const removeRole = async (req, res) => {
  const { role_id } = req.params;
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
    res.json({ success: false, message: "role cant be deleted" });
  }
};
