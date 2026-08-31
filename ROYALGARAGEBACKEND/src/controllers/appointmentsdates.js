import { pool } from "../../Db.js";

// calender view for client side
export const appointmentsDatesList = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  try {
    const appointmentsList = await pool.query(
      " SELECT appointment_day,service_name,license_plate FROM jobs JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN job_services ON job_services.job_id= jobs.job_id JOIN services ON  job_services.service_id =services.service_id   WHERE client_id=$1",
      [client_id],
    );
    res.status(200).json({ success: true, data: appointmentsList.rows });
  } catch (error) {
    console.log(error.message);
  }
};

// for the admin
export const adminAppointmentsDatesList = async (req, res) => {
  try {
    const appointmentsList = await pool.query(
      " SELECT appointment_day,service_name,license_plate FROM jobs JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN job_services ON job_services.job_id= jobs.job_id JOIN services ON  job_services.service_id =services.service_id   ",
    );
    res.status(200).json({ success: true, data: appointmentsList.rows });
  } catch (error) {
    console.log(error.message);
  }
};
