import { Pool } from "pg";
import pgPromise from "pg-promise";
import { ENV } from "./env.js";

const pool = new Pool({
  user: ENV.DB_USER,
  host: ENV.DB_HOST,
  database: ENV.DB_NAME,
  password: ENV.DB_PASSWORD,
  port: ENV.DB_PORT,
});

const DbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(" Database connected successfully");
    client.release(); // Return the client to the pool
  } catch (err) {
    console.error(" Database connection failed");
    console.error(err.message);

    process.exit(1);
  }
};

export { pool, DbConnection };
