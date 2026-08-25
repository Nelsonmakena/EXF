import { pool } from "../../Db.js";

//admin
export const totalNumbers = async (req, res) => {
  try {
    const response = await pool.query(
      "SELECT(SELECT COUNT(*) FROM employee) AS workers, (SELECT COUNT(*) FROM vehicle) AS vehicles,(SELECT COUNT(*) FROM client) AS clients",
    );
    res.status(200).json({ success: true, data: response.rows });
  } catch (error) {
    console.log(error.message);
  }
};

//client

export const TotalNumbersClient = async (req, res) => {
  const { client_id } = req.userinfo;
  if (!client_id) {
    return res.json({ success: false, message: "access denied" });
  }
  try {
    const response = await pool.query(
      "SELECT COUNT (*) AS vehicles_number FROM vehicle WHERE client_id  = $1 ",
      [client_id],
    );
    res.status(200).json({ success: true, data: response.rows[0] });
  } catch (error) {
    console.log(error.message);
  }
};
