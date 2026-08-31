import { pool } from "../../Db.js";

// client
// posting jobs(client getting a job )
export const job = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  const { vehicle_id, appointment_day, service_id } = req.body;
  let job_id;

  try {
    //check if the job exist job is tied to vehicle_id ie one vehicle can have multiple services
    const checkJob = await pool.query(
      "SELECT job_id FROM jobs WHERE vehicle_id = $1 AND job_current_status <> $2",
      [vehicle_id, "completed"],
    );

    if (checkJob.rows.length > 0) {
      job_id = checkJob.rows[0].job_id;
    } else {
      const newJob = await pool.query(
        "INSERT INTO jobs(vehicle_id,appointment_day) VALUES ($1,$2) RETURNING job_id ",
        [vehicle_id, appointment_day],
      );
      console.log(newJob.rows);

      job_id = newJob.rows[0].job_id;
    }
    //check if service is already been done to a vehicle
    const checkServiceStatus = await pool.query(
      "SELECT  * FROM job_services WHERE job_id = $1 AND service_id = $2 ",
      [job_id, service_id],
    );
    if (checkServiceStatus.rows.length !== 0) {
      return res.json({
        success: false,
        message: "service already in progress",
      });
    }
    const servicesJobs = await pool.query(
      "INSERT INTO job_services ( service_id ,job_id ) VALUES ($1,$2)",
      [service_id, job_id],
    );
    res
      .status(200)
      .json({ success: true, message: "job created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// fetching list services  for client (client subscribed jobs ) (get-method)

export const getAllJobs = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  try {
    const job = await pool.query(
      " SELECT * FROM jobs JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN job_services ON job_services.job_id= jobs.job_id JOIN services ON  job_services.service_id =services.service_id   WHERE client_id=$1",
      [client_id],
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};

//bling fetching services to be billed

export const billing = async (req, res) => {
  const { client_id } = req.userinfo;
  let count = 0;
  let totalprice = 0;
  let services = "";
  let is_it_billed = false;
  if (!client_id) {
    console.log("access denied");
  }
  try {
    const billingItems = await pool.query(
      "SELECT service_name, service_price,license_plate ,job_id, is_it_billed FROM jobs JOIN services ON jobs.service_id = services.service_id  JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id WHERE client_id = $1 AND is_it_billed =$2  ",
      [client_id, is_it_billed],
    );
    console.log(billingItems.rows);

    if (!billingItems.length) {
      return res.json({
        success: false,
        message: "NO billing items at the moment",
      });
    }
    for (const item in billingItems.rows) {
      totalprice += Number(billingItems.rows[item].service_price);
      services +=
        billingItems.rows[item].license_plate +
        " " +
        billingItems.rows[item].service_name;
    }

    const addBillingItems = await pool.query(
      "INSERT INTO billing_services (client_id,total_amount,jobs) VALUES($1,$2,$3) RETURNING *",
      [client_id, totalprice, services],
    );

    if (!addBillingItems.length) {
      return res.json({ success: false, message: "error ocured" });
    }

    is_it_billed = true;
    for (const item in billingItems.rows) {
      const updateBillingStatus = await pool.query(
        "UPDATE jobs SET is_it_billed =$1 ",
        [is_it_billed],
      );
    }

    res.status(200).json({
      success: true,
      message: "items added",
      data: addBillingItems.rows[0],
    });
  } catch (error) {
    console.log(error.message);
  }
};

///employees

///fetch job list for an employee assigned to him
export const employeeJobList = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  try {
    const response = await pool.query(
      "SELECT status,service_name,license_plate,appointment_day,job_services_id FROM job_services JOIN services ON services.service_id=job_services.service_id  JOIN jobs ON jobs.job_id=job_services.job_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id  WHERE employee_id = $1 AND status is NULL  ORDER BY appointment_day ASC",
      [employee_id],
    );
    res.status(200).json({
      success: true,
      data: response.rows,
    });
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};

// list of all accepted ie in progress job for employee
export const InProgressEmployee = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  try {
    const response = await pool.query(
      "SELECT status,service_name,license_plate,appointment_day,job_services_id FROM job_services JOIN services ON services.service_id=job_services.service_id  JOIN jobs ON jobs.job_id=job_services.job_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id  WHERE employee_id = $1 AND status =$2  ORDER BY appointment_day ASC",
      [employee_id, "accepted"],
    );
    res.status(200).json({
      success: true,
      data: response.rows,
    });
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }
};
//employee accepting a job
export const acceptJob = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  const { job_services_id } = req.body;
  if (!req.body) {
    return res.json("all filled must be filled");
  }
  const date = Date().split("G", 1).toString();
  console.log(req.body);

  try {
    const checkId = await pool.query(
      "SELECT * FROM job_services WHERE job_services_id = $1 AND employee_id=$2 AND status IS NULL ",
      [job_services_id, employee_id],
    );
    console.log(checkId.rows);

    if (checkId.rows.length == 0) {
      return res.status(400).json({ success: false });
    }
    const updateJobService = await pool.query(
      "UPDATE job_services SET status=$1, started_at=$2 WHERE job_services_id = $3  RETURNING *",
      ["accepted", date, job_services_id],
    );
    res.status(200).json({
      success: true,
      message: "job accepted",
      data: updateJobService.rows[0],
    });
  } catch (error) {
    console.log(error.message);
  }
};

// job status updater
export const updateJobStatus = async (req, res) => {
  const { employee_id } = req.userinfo;
  if (!employee_id) {
    return res.json({ success: false, message: "access denied" });
  }
  const { trackStatus, job_services_id } = req.body;
  try {
    const updateStatus = await pool.query(
      "INSERT INTO job_services_tracking (job_service_id,track_status) VALUES($1,$2)",
      [job_services_id, trackStatus],
    );
    res.status(200).json({
      success: true,
      message: "job updated successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

///admin section

// fetching all jobs for admin view (get-method) non assigned jobs
export const AllJobs = async (req, res) => {
  try {
    const job = await pool.query(
      "SELECT first_name,last_name,phonenumber,email,license_plate,vehicle_brand,vehicle_color,service_name ,job_services_id FROM jobs JOIN job_services ON job_services.job_id =jobs.job_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN client ON client.client_id= vehicle.client_id JOIN services ON services.service_id = job_services.service_id WHERE employee_id IS NULL ",
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};

//fetching in progress jobs

export const inProgress = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT appointment_day,appointment_day,vehicle_model,license_plate,service_name,employee.email  FROM jobs JOIN job_services ON job_services.job_id =jobs.job_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN client ON client.client_id= vehicle.client_id JOIN services ON services.service_id = job_services.service_id JOIN employee ON employee.employee_id = job_services.employee_id  WHERE job_services.employee_id IS NOT NULL",
    );
    res.status(200).json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error.message);
  }
};

///assign jobs to workers (post method)

export const assignJob = async (req, res) => {
  const { employee_id, job_services_id } = req.body;

  if (Object.keys(req.body).length == 0) {
    return res.json("all fields are required");
  }

  try {
    const assignJob = await pool.query(
      "UPDATE job_services SET employee_id = $1 Where job_services_id = $2 ",
      [employee_id, job_services_id],
    );
    res.status(200).json({
      success: true,
      message: "job assigned to ",
      // data: assignJob.rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//fetching unallocated jobs (get-method)

export const unallocatedJobs = async (req, res) => {
  try {
    const listOfUnaloccatedJobs = await pool.query(
      "SELECT * FROM jobs JOIN job_services ON job_services.job_id =jobs.job_id WHERE employee_id ISNULL ",
    );
    res.status(200).json({ success: true, data: listOfUnaloccatedJobs.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

///details for a specific job

export const jobDetails = async (req, res) => {
  const { job_services_id } = req.params;

  try {
    const response = await pool.query(
      "SELECT appointment_day,license_plate,first_name,second_name,email,vehicle_brand,job_services_id,job_creation_time,service_name,service_image  FROM job_services JOIN jobs ON jobs.job_id=job_services.job_id JOIN vehicle ON vehicle.vehicle_id=jobs.vehicle_id JOIN client ON client.client_id=vehicle.client_id JOIN services ON job_services.service_id=services.service_id WHERE job_services_id=$1",
      [job_services_id],
    );
    console.log(response.rows[0]);

    res.status(200).json({ success: true, data: response.rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};
