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
