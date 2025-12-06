import { Request, Response } from "express";
import { bookingService } from "./booking.service";

//create booking
const createBooking = async (req: Request, res: Response) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
  //   console.log(req.body);
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const rentDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  try {
    const result = await bookingService.createBooking(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      rentDays
    );
    const booking = result.result.rows[0];
    const vehicleResult = result.vehicleResult.rows[0];
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        ...booking,
        vehicle: {
          vehicle_name: vehicleResult.vehicle_name,
          daily_rent_price: vehicleResult.daily_rent_price,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all booking
const getBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getBooking();
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update booking
const updateBooking = async (req: Request, res: Response) => {
  const { status } = req.body;
  const id = req.params.vehicleId;
  try {
    const result = await bookingService.updateBooking(status, id!);
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getBooking,
  updateBooking,
};
