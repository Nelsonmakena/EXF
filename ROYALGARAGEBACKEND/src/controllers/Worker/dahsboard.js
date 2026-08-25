import { pool } from "../../../Db.js";

export const totalAssigned = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  try {
    const count = await pool.query(
      "SELECT( SELECT  COUNT (*)  FROM job_services WHERE employee_id =$1 AND status IS NULL)AS total_assigned ,(SELECT COUNT (*) FROM job_services WHERE employee_id =$1 AND status=$2)AS completed,(SELECT COUNT (*) FROM job_services WHERE employee_id =$1 AND status IS NOT NULL) AS in_progress",
      [employee_id, "completed"],
    );
    res.status(200).json({ success: true, data: count.rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};
