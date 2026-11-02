import { pool } from "../../../Db.js";

export const VehicleAssessmentList = async (req, res) => {
  const date = new Date();
  try {
    const response = await pool.query(
      `SELECT *  FROM  vehicle_in_garage vg
        JOIN jobs j ON j.job_id= vg.job_id
        JOIN vehicles v ON v.vehicle_id=j.vehicle_id Where vg.in_garage =$1  `,
      [false],
    );
    res.json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error.message);
  }
};
