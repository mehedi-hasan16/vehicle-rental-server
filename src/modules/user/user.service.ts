import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

//get all user
const getUser = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

// update user
const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email=$2, phone=$3, role=$4 WHERE id = $5 RETURNING id, name, email, phone, role`,
    [name, email, phone, role, id]
  );
  return result;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  getUser,
  updateUser,
  deleteUser,
};
