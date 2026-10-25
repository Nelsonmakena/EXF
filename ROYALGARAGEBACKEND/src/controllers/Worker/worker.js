import { pool } from "../../../Db.js";

//all  specific employee related
//add new position
export const newPosition = async (req, res) => {
  const { position_name, position_description } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO positions (position_name,position_description) VALUES ($1,$2) ",
      [position_name, position_description],
    );
    res.status(200).json({ success: true, message: "position created " });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "position cant be created" });
  }
};

// list of positions

export const positionList = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM positions");
    res.status(200).json({ success: true, data: response.rows });
  } catch (error) {
    console.error("error.message");
    res.json({ success: false, message: "list cant be displayed" });
  }
};
