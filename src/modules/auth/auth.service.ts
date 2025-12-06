import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  role: string
) => {
  const hashedPass = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email, password, phone, role ) VALUES($1, $2, $3,$4, $5) RETURNING id, name, email, phone, role`,
    [name, email, hashedPass, phone, role]
  );
  return result;
};

//login user
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email =$1`, [
    email,
  ]);
  const user = result.rows[0];
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    `${config.jwt_secret}`,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const authService = {
  createUser,
  loginUser,
};
