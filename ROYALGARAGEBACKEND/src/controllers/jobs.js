import { pool } from "../../Db.js";

// client
// posting jobs(client getting a job )
export const job = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  const { vehicle_id, appointemnt_day, service_id } = req.body;
  let job_id;

  try {
    //check if the job exist job is tied to vehicle_id ie one vehicle can have mutliple services
    const checkJob = await pool.query(
      "SELECT job_id FROM jobs WHERE vehicle_id = $1 AND job_current_status <> $2",
      [vehicle_id, "completed"],
    );

    if (checkJob.rows.length > 0) {
      job_id = checkJob.rows[0].job_id;
    } else {
      const newJob = await pool.query(
        "INSERT INTO jobs(vehicle_id,appointment_day ) VALUES ($1,$2) RETURNING job_id ",
        [vehicle_id, appointemnt_day],
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

//biling fething services to be billled

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
      "SELECT service_name, service_price,liscence_plate ,job_id, is_it_billed FROM jobs JOIN services ON jobs.service_id = services.service_id  JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id WHERE client_id = $1 AND is_it_billed =$2  ",
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
        billingItems.rows[item].liscence_plate +
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

///adimin section

// fetching all jobs for admin view (getmethod)
export const AllJobs = async (req, res) => {
  try {
    const job = await pool.query(
      "SELECT first_name,last_name,phonenumber,email,liscence_plate,vehicle_brand,vehicle_color,service_name FROM jobs JOIN job_services ON job_services.job_id =jobs.job_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN client ON client.client_id= vehicle.client_id JOIN services ON services.service_id = job_services.service_id ",
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};

///assgin jobs to workers (post method)

export const assignJob = async (req, res) => {
  const { employee_id, job_services_id } = req.body;

  if (Object.keys(req.body).length == 0) {
    return res.json("all fields are required");
  }

  try {
    const assignJob = await pool.query(
      "UPDATE job_services SET employee_id = $1 Where job_services_id = $2 RETURNING *",
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
