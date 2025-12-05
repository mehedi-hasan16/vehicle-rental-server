import { Pool } from "pg";
import config from ".";

// connection to database
export const pool = new Pool({
  connectionString: `${config.connection_string}`,
});

// create database
const initDB = async () => {
  await pool.query(
    `
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL CHECK (email ~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
        password TEXT NOT NULL CHECK (length(password) >= 6),
        phone TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'customer'))
        )
    `
  );

  await pool.query(
    `
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        type TEXT CHECK(type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(50) NOT NULL UNIQUE,
        daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
        availability_status TEXT CHECK(availability_status IN (	'available', 'booked'))
        )
    `
  );

  await pool.query(
    `
        CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,    
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC NOT NULL CHECK (total_price > 0),
        status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
        )
    `
  );
};

export default initDB;
