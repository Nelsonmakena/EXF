import { pool } from "../../Db.js";

export const getAccountRoles = async (accountType = null) => {
  const response = await pool.query(
    `
      SELECT
        r.role_name,
        r.account_role_id,
        COUNT(a.account_role_id) AS total_number
      FROM account_roles r
      LEFT JOIN accounts a
        ON a.account_role_id = r.account_role_id
      ${accountType ? "WHERE r.role_name = $1" : ""}
      GROUP BY r.account_role_id, r.role_name
      ORDER BY r.role_name ASC
    `,
    accountType ? [accountType] : [],
  );

  return response.rows;
};
