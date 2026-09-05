import { pool } from "../../../Db.js";

//list of client
export const Clients = async (req, res) => {
  try {
    const clientList = await pool.query(
      "SELECT first_name,second_name,last_name,email,client.client_id, address,vehicle_brand,vehicle.vehicle_id,vehicle_color,vehicle_model,license_plate, jobs.job_id,job_services_id,service_name FROM client  LEFT JOIN vehicle ON vehicle.client_id=client.client_id LEFT JOIN jobs ON jobs.vehicle_id = vehicle.vehicle_id LEFT JOIN job_services ON job_services.job_id = jobs.job_id LEFT JOIN services ON job_services.service_id= services.service_id",
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
    res
      .status(200)
      .json({ success: true, data: results, raw: clientList.rows });
  } catch (error) {
    console.log(error.message);
  }
};

export const clientInfo = async (req, res) => {
  const { client_id } = req.params;
  console.log(client_id);

  try {
    const client = await pool.query(
      "SELECT first_name,second_name,last_name,email,client.client_id, address,vehicle_brand,vehicle.vehicle_id,vehicle_color,vehicle_model,license_plate, jobs.job_id,job_services_id,service_name ,appointment_day,client.created_at,added_at ,phonenumber FROM client  LEFT JOIN vehicle ON vehicle.client_id=client.client_id LEFT JOIN jobs ON jobs.vehicle_id = vehicle.vehicle_id LEFT JOIN job_services ON job_services.job_id = jobs.job_id LEFT JOIN services ON job_services.service_id= services.service_id WHERE client.client_id=$1",
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
  }
};
