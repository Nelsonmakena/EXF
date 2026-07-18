import { pool } from "../../../Db.js";

// posting jobs
export const job = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  const { vehicle_id, service_id } = req.body;
  // checking if the job alredy exists  // needs fixing since once job is complete that same vivhle cannot do the same job
  const checkexistingJob = await pool.query(
    "SELECT vehicle_id,service_id FROM jobs WHERE vehicle_id =$1 AND service_id =$2 ",
    [vehicle_id, service_id],
  );
  if (checkexistingJob.rows.length !== 0) {
    return res.json({ success: false, message: "job alredy created" });
  }

  try {
    const newJob = await pool.query(
      "INSERT INTO jobs(vehicle_id,service_id) VALUES ($1,$2) RETURNING * ",
      [vehicle_id, service_id],
    );
    res
      .status(200)
      .json({ success: true, message: "job created successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// fetching jobs for client

export const getAllJobs = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  try {
    const job = await pool.query(
      "SELECT liscence_plate,vehicle_brand,vehicle_model, vehicle_color,service_name,job_id FROM jobs JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN services ON jobs.service_id =services.service_id  WHERE client_id=$1",
      [client_id],
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};

// fetching all jobs for admin view and worker
export const AllJobs = async (req, res) => {
  try {
    const job = await pool.query(
      "SELECT first_name,last_name,phonenumber,email,liscence_plate,vehicle_brand,vehicle_color,service_name FROM jobs JOIN services ON jobs.service_id =services.service_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN client ON client.client_id= vehicle.client_id",
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};
