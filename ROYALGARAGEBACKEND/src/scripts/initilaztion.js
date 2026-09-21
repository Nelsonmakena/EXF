import bcrypt from "bcryptjs";
import { pool } from "../../Db.js";

const initializeSystem = async () => {
  try {
    const existingAdmin = await pool.query(
      "SELECT admin_id FROM admin LIMIT 1",
    );

    if (existingAdmin.rows.length > 0) {
      return;
    }

    const defaultPassword = "1234";
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    await pool.query(
      `INSERT INTO admin (username, password_hash)
       VALUES ($1, $2)`,
      ["superadmin", passwordHash],
    );

    console.log("Initial super admin created.");
  } catch (error) {
    console.error("System initialization failed:", error.message);
  }
};

export default initializeSystem;
