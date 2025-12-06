import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const hashedPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email, password, phone, role ) VALUES($1, $2, $3,$4, $5) RETURNING *`,
    [name, email, hashedPass, phone, role]
  );
  return result;
};

export const userService = {
  createUser,
};
