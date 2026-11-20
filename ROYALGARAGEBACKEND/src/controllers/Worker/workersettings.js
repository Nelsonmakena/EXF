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
    res.json({ success: false, message: "server error" });
  }
};

//new worker data

export const newEmployeeData = async (req, res) => {
  const { employee_id, account_id } = req.user_info;
  const {
    first_name,
    second_name,
    last_name,
    phone_number,
    medicalCondition,
    nextOfKeen,
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    //inserting a medical condtion if there is
    if (medicalCondition) {
      await client.query(
        "INSERT INTO  medicalcondition  (condtion , employee_id) VALUES ($1,$2)",
        [medicalCondition, employee_id],
      );
    }
    await client.query(
      `UPDATE employee
   SET first_name = $1,
       second_name = $2,
       last_name = $3,
       phone_number = $4
   WHERE employee_id = $5
   RETURNING *`,
      [first_name, second_name, last_name, phone_number, employee_id],
    );

    for (const keen of nextOfKeen) {
      await client.query(
        `INSERT INTO next_of_keen
     (employee_id, name, phone_number, alternative_number)
     VALUES ($1, $2, $3, $4)`,
        [employee_id, keen.name, keen.phone_number, keen.alternative_number],
      );
    }

    //update the first time login flag
    await client.query(
      `UPDATE accounts
   SET first_time_login = $1
   WHERE account_id = $2
   RETURNING *`,
      [false, account_id],
    );

    const response = await client.query(
      `SELECT a.email ,a.password_hash,a.account_id,e.first_name,e.last_name, e.employee_id ,a.first_time_login , a.is_active,r.role_name AS employee_role,ar.role_name
      FROM accounts a
       JOIN employee e ON e.account_id =a.account_id 
        JOIN account_roles ar ON ar.account_role_id = a.account_role_id
        JOIN roles r ON r.role_id = e.role_id 
      WHERE e.employee_id= $1 `,
      [employee_id],
    );
    await client.query("COMMIT");
    const user = response.rows[0];
    const info = {
      account_id: user[0].account_id,
      first_time_login: user[0].first_time_login,
      role: user.role_name,
      employee_role: user.employee_role,
      employee_id: user.employee_id,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    const accessToken = jwt.sign(info, ENV.JWT_SECRET_KEY, {
      expiresIn: "3hr",
    });

    res.cookie("token", accessToken, { httpOnly: true, secure: false });
    res.status(200).json({
      success: true,
      message: "details updated successful ",
      data: info,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.json({
      success: false,
      message: "personal information cannot be added try again ",
    });
  } finally {
    client.release();
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
    res.json({
      success: false,
      message: "profile info cannot be updated now ",
    });
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
