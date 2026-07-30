import { pool } from "../../../Db";

/// track any change billing table services like unpaid services

export const checkUnpaidServices = async (req, res) => {
  const { client_id } = req.userinfo;
  let paid_status = false;
  try {
    const check = await pool.query(
      "SELECT * FROM billing_services WHERE client_id = $1 AND paid_status =$2",
      [client_id, paid_status],
    );
    res.status(200).json({ success: true, data: check.rows });
  } catch (error) {
    console.log(error.message);
  }
};
