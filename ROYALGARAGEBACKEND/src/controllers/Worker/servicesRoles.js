import { pool } from "../../../Db.js";

export const newServiceCategoryRole = async (req, res) => {
  const { service_category_id, role_id } = req.body;
  try {
    const findRole = await pool.query(
      "SELECT * FROM service_role WHERE role_id=$1",
      [role_id],
    );
    if (findRole.rows.length !== 0) {
      return res.json({
        success: false,
        message: "role already has an assigned service category",
      });
    }
    const response = await pool.query(
      "INSERT INTO services_roles (service_category_id, role_id) VALUES ($1,$2) RETURNING * ",
      [service_category_id, role_id],
    );
    res.json({ success: true, message: "role added to the service category" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: "the role cannot be added to the service category",
    });
  }
};
