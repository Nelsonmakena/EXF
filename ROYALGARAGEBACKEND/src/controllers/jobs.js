import { pool } from "../../Db.js";

// client
// posting jobs(client getting a job )
export const job = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    console.log("access denied");
  }
  const { vehicle_id, service_id, service_date } = req.body;
  // checking if the job alredy exists  // needs fixing since once job is complete that same vivhle cannot do the same
  // job so needs checking in the jobcompletion status to allow same vehicle to have same service fixed added a service date
  const checkexistingJob = await pool.query(
    "SELECT vehicle_id,service_id,dayofservice FROM jobs WHERE vehicle_id =$1 AND service_id =$2 AND dayofservice= $3 ",
    [vehicle_id, service_id, service_date],
  );
  if (checkexistingJob.rows.length !== 0) {
    return res.json({ success: false, message: "job alredy created" });
  }

  try {
    const newJob = await pool.query(
      "INSERT INTO jobs(vehicle_id,service_id,dayofservice) VALUES ($1,$2,$3) RETURNING * ",
      [vehicle_id, service_id, service_date],
    );
    res
      .status(200)
      .json({ success: true, message: "job created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

// fetching services  for client (client subcribed jobs ) (getmethod)

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
      "SELECT first_name,last_name,phonenumber,email,liscence_plate,vehicle_brand,vehicle_color,service_name ,job_id FROM jobs JOIN services ON jobs.service_id =services.service_id JOIN vehicle ON jobs.vehicle_id = vehicle.vehicle_id JOIN client ON client.client_id= vehicle.client_id",
    );
    res.status(200).json({ success: true, data: job.rows });
  } catch (error) {
    console.log(error.message);
  }
};

///assgin jobs to workers (post method)

export const assignJob = async (req, res) => {
  const { employee_id, job_id } = req.body;
  if (Object.keys(req.body).length == 0) {
    return res.json("all fields are required");
  }

  try {
    const Assign = await pool.query(
      "INSERT INTO jobsallocation (employee_id, job_id ) VALUES ($1,$2) RETURNING * ",
      [employee_id, job_id],
    );
    res
      .status(200)
      .json({ success: true, message: "job assigned to ", data: Assign.rows });
  } catch (error) {
    console.log(error.message);
  }
};

//fetching unallocated jobs (get-method)

export const unallocatedJobs = async (req, res) => {
  const job_allocation_status = null;
  try {
    const listOfUnaloccatedJobs = await pool.query(
      "SELECT * FROM jobs LEFT JOIN jobsallocation ON jobsallocation.job_id =jobs.job_id WHERE job_allocation_status = $1",
      [job_allocation_status],
    );
    res.status(200).json({ success: true, data: listOfUnaloccatedJobs.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
