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

//employee roles

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
    res.json({ success: false, message: "server error" });
  }
};

export const updateRoleInfo = async (req, res) => {
  const { account_role_id } = req.params;
  const { role_name, role_description } = req.body;
  try {
    await pool.query(
      "UPDATE account_roles SET role_name =$1 , role_description = $2  WHERE account_role_id = $3",
      [role_name, role_description, account_role_id],
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

//view of all account both employee and client

export const accountsList = async (req, res) => {
  try {
    const accounts = await pool.query(
      `SELECT a.account_id ,a.is_active ,a.email ,a.created_at ,e.first_name,e.second_name , e.last_name ,e.employee_id ,c.first_name , c.second_name ,c.last_name, c.client_id    
      FROM accounts a  
      LEFT JOIN employee e ON e.account_id = a.account_id
      LEFT JOIN client c ON c.account_id = a.account_id`,
    );
    const clientsNoAccounts = await pool.query(
      "SELECT * FROM client c WHERE c.account_id IS NULL",
    );
    const response = [...accounts.rows, ...clientsNoAccounts.rows];
    const result = response.reduce((acc, item) => {
      let findAccount = acc.find(
        (account) => account.account_id === item.account_id,
      );

      if (!findAccount) {
        findAccount = {
          account_id: item.account_id,
          email: item.email,
          first_name: item.first_name,
          last_name: item.last_name,
          is_active: item.is_active,
          owner: item.employee_id ? "employee" : "client",
          type: item.account_id ? "account-present" : "no-account-present",
        };

        acc.push(findAccount);
      }
      return acc;
    }, []);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "list cant be displayed " });
  }
};
// single account view

export const singleAccountView = async (req, res) => {
  const { account_id } = req.params;
  try {
    const response = await pool.query(
      `SELECT * FROM accounts a LEFT JOIN employee e ON a.account_id = e.account_id LEFT JOIN client c ON c.account_id = a.account_id WHERE a.account_id = $1  `,
      [account_id],
    );
    res.status(200).json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "info cant be fetched " });
  }
};
//deactivate account

export const accountDeactivation = async (req, res) => {
  const { account_id } = req.body;
  try {
    const response = await pool.query(
      "UPDATE account SET is_active = $1 WHERE account_id = $2 RETURNING account_id,email ",
      ["true", account_id],
    );
    res.status(200).json({ success: true, message: "account deactivated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "account cannot be deactivated " });
  }
};
