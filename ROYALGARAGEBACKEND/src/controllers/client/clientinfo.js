import { pool } from "../../../Db.js";

///adding a new client record

export const newClientRecord = async (req, res) => {
  const {
    first_name,
    second_name,
    last_name,
    phone_number,
    vehicle_model,
    vehicle_brand,
    vehicle_color,
    license_plate,
  } = req.body;
  const client = await new pool.connect();
  try {
    await client.query("BEGIN");
    const newClient = await client.query(
      "INSERT INTO client (first_name , second_name , last_name , phone_number) VALUES ($1,$2,$3,$4) RETURNING client_id",
      [first_name, second_name, last_name, phone_number],
    );
    const clientId = newClient.rows[0].client_id;
    const newVehicle = await client.query(
      "INSERT INTO vehicle (vehicle_model , vehicle_brand , vehicle_color, license_plate,client_id) VALUES ($1,$2,$3,$4,$5)",
      [vehicle_model, vehicle_brand, vehicle_color, license_plate, clientId],
    );
    await client.query("COMMIT");
    res
      .status(200)
      .json({ success: true, message: "client details added successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error.message);
    res.json({ success: false, message: "internal server error" });
  } finally {
    client.release;
  }
};

//list of client
export const Clients = async (req, res) => {
  try {
    const clientList = await pool.query(
      `SELECT first_name,second_name,last_name,email,c.client_id, vehicle_brand,v.vehicle_id,vehicle_color,vehicle_model,license_plate, j.job_id,job_services_id,service_name
       FROM client c 
        LEFT JOIN accounts a ON a.account_id = c.account_id 
       LEFT JOIN vehicle v ON c.client_id = v.client_id 
       LEFT JOIN jobs j ON j.vehicle_id = v.vehicle_id 
       LEFT JOIN job_services js ON js.job_id = j.job_id 
       LEFT JOIN services s ON js.service_id= s.service_id`,
    );

    const results = clientList.rows.reduce((acc, item) => {
      let findClient = acc.find(
        (client) => client.client_id === item.client_id,
      );

      if (!findClient) {
        findClient = {
          client_id: item.client_id,
          first_name: item.first_name,
          second_name: item.second_name,
          last_name: item.last_name,
          email: item.email,
          vehicles: [],
          totalJobs: 0,
          totalServices: 0,
        };

        acc.push(findClient);
      }

      if (!item.vehicle_id) {
        return acc;
      }

      let findVehicle = findClient.vehicles.find(
        (vehicle) => vehicle.vehicle_id === item.vehicle_id,
      );

      if (!findVehicle) {
        findVehicle = {
          vehicle_id: item.vehicle_id,
          plate: item.license_plate,
          model: item.vehicle_model,
          jobs: [],
        };

        findClient.vehicles.push(findVehicle);
      }

      if (!item.job_id) {
        return acc;
      }

      let findJob = findVehicle.jobs.find((job) => job.job_id === item.job_id);

      if (!findJob) {
        findJob = {
          job_id: item.job_id,
          services: [],
        };

        findVehicle.jobs.push(findJob);
        findClient.totalJobs++;
      }

      if (!item.job_services_id) {
        return acc;
      }

      const serviceExists = findJob.services.find(
        (service) => service.job_services_id === item.job_services_id,
      );

      if (!serviceExists) {
        findJob.services.push({
          job_services_id: item.job_services_id,
          service_id: item.service_id,
          service_name: item.service_name,
        });
        findClient.totalServices++;
      }

      return acc;
    }, []);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "internal server error" });
  }
};

export const clientInfo = async (req, res) => {
  const { client_id } = req.params;
  try {
    const client = await pool.query(
      `SELECT first_name,second_name,last_name,email,c.client_id, address,vehicle_brand,vehicle.vehicle_id,vehicle_color,vehicle_model,license_plate, j.job_id,job_services_id,service_name ,appointment_day,c.created_at,added_at ,phone_number 
      FROM client c 
      JOIN accounts a ON a.account_id = c.account_id 
      LEFT JOIN vehicle v ON v.client_id=c.client_id 
      LEFT JOIN jobs j ON j.vehicle_id = v.vehicle_id 
      LEFT JOIN job_services s  ON s.job_id = j.job_id 
      LEFT JOIN services ON job_services.service_id= s.service_id 
      WHERE client.client_id=$1`,
      [client_id],
    );

    const results = client.rows.reduce((acc, item) => {
      if (!acc.info) {
        acc.info = {
          first_name: item.first_name,
          second_name: item.second_name,
          last_name: item.last_name,
          createdAt: item.created_at,
          email: item.email,
          phone: item.phonenumber,
          total_vehicles: 0,
          total_jobs: 0,
          total_services: 0,
          vehicles: [],
        };
      }
      if (!item.vehicle_id) {
        return acc;
      }
      let findVehicle = acc.info.vehicles.find(
        (vehicle) => vehicle.vehicle_id === item.vehicle_id,
      );
      if (!findVehicle) {
        findVehicle = {
          vehicle_id: item.vehicle_id,
          brand: item.vehicle_brand,
          model: item.vehicle_model,
          day_added: item.added_at,
          jobs: [],
        };
        acc.info.vehicles.push(findVehicle);
        acc.info.total_vehicles++;
      }
      if (!item.job_id) {
        return acc;
      }
      let findJob = findVehicle.jobs.find((job) => job.job_id === item.job_id);
      if (!findJob) {
        findJob = {
          job_id: item.job_id,
          appointment_day: item.appointment_day,
          services: [],
        };
        findVehicle.jobs.push(findJob);
        acc.info.total_jobs++;
      }
      findJob.services.push({
        service_name: item.service_name,
      });
      acc.info.total_services++;
      return acc;
    }, {});
    res.status(200).json({ success: true, data: results, raw: client.rows });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "internal server error" });
  }
};
