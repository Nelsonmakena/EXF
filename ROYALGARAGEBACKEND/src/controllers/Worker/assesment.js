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

export const singleAssessmentItem = async (req, res) => {
  const { garage_id } = req.params;
  try {
    const response = await pool.query(
      `
      SELECT 
       garage_id, j.job_id , c.first_name , c.second_name , c.last_name , c.phone_number,s.service_name, s.service_image , v.license_plate , v.vehicle_brand , v.vehicle_model , v.vehicle_color 
      
      FROM vehicle_in_garage vg  
      JOIN  jobs j ON j.job_id=vg.job_id 
      JOIN job_services js ON js.job_id = j.job_id 
      JOIN services s ON s.service_id = js.service_id 
      JOIN vehicle v ON  v.vehicle_id = j.vehicle_id 
      JOIN client c ON c.client_id = v.client_id WHERE vg.garage_id = $1 `,
      [garage_id],
    );
    const responseData = response.rows.reduce((acc, item) => {
      if (!acc.garage_id) {
        acc.garage_id = item.garage_id;
        acc.job_id = item.job_ida;
        acc.services = [];
        acc.vehicle = {
          vehicle_plate: item.license_plate,
          model: item.vehicle_model,
          brand: item.vehicle_brand,
          color: item.vehicle_color,
        };
        acc.client = {
          firstName: item.first_name,
          second_name: item.second_name,
          lastName: item.last_name,
          phoneNumber: item.phone_number,
        };
      }
      acc.services.push({
        service_name: item.service_name,
        service_image: item.service_image,
      });
      return acc;
    }, {});
    res.json({ success: true, data: responseData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "error details not available" });
  }
};
