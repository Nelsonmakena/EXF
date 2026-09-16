import { pool } from "../../../Db.js";

export const totalAssigned = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  try {
    const count = await pool.query(
      `SELECT
      ( SELECT  COUNT (*)  FROM service_assignment WHERE employee_id =$1 AND assignment_status=$2)AS total_assigned ,
       (SELECT COUNT (*) FROM service_assignment JOIN job_services ON job_services.job_services_id = service_assignment.job_services_id   WHERE employee_id =$1 AND completed_at IS NOT NULL )AS completed,
       (SELECT COUNT (*) FROM service_assignment  JOIN job_services ON job_services.job_services_id = service_assignment.job_services_id WHERE employee_id =$1 AND accepted_at IS NOT NULL AND completed_at IS  NULL) AS in_progress`,
      [employee_id, "pending"],
    );
    res.status(200).json({ success: true, data: count.rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};
