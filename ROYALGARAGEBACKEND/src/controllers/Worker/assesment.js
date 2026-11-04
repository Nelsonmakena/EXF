import { pool } from "../../../Db.js";

export const VehicleAssessmentList = async (req, res) => {
  const date = new Date();
  try {
    const response = await pool.query(
      `SELECT v.vehicle_model , v.vehicle_brand , v.license_plate, j.appointment_day, j.job_id, vg.* FROM  vehicle_in_garage vg
        JOIN jobs j ON j.job_id= vg.job_id
        JOIN vehicle v ON v.vehicle_id=j.vehicle_id Where vg.in_garage =$1  `,
      [false],
    );
    res.json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "list cant be displayed" });
  }
};
