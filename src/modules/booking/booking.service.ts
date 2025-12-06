import { pool } from "../../config/db";

//   post booking
const createBooking = async (
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string,
  rentDays: number
) => {
  const vehicleResult = await pool.query(
    "SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1",
    [vehicle_id]
  );
  const total_price = rentDays * vehicleResult.rows[0].daily_rent_price;

  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id, rent_start_date, rent_end_date,total_price, status ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );
  return {
    result: result,
    vehicleResult: vehicleResult,
  };
};

// get booking
const getBooking = async () => {
  const result = await pool.query(`SELECT bookings. * ,
    json_build_object(
      'name', users.name,
      'email', users.email
    ) AS customer,
     json_build_object(
      'vehicle_name', vehicles.vehicle_name,
      'registration_number', vehicles.registration_number
    ) AS vehicle
    FROM bookings
    JOIN users ON bookings.customer_id = users.id
    JOIN vehicles ON bookings.vehicle_id = vehicles.id`);
  return result;
};

// update booking
const updateBooking = async (status: string, id: string) => {
  const result = await pool.query(
    `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result;
};

export const bookingService = {
  createBooking,
  getBooking,
  updateBooking,
};
