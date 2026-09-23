import { pool } from "../../../../Db.js";

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
    res.json({ success: false, message: "account role cant be added" });
  }
};

//list of account roles
export const accountRoles = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT r.role_name ,r.account_role_id ,COUNT (a.account_role_id) As total_number  FROM account_roles r LEFT JOIN accounts a  ON a.account_role_id = r.account_role_id GROUP BY r.account_role_id , r.role_name ",
    );

    res.status(200).json({
      success: true,
      message: "role added successfully",
      data: response.rows,
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
