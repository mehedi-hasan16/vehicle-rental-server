import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.post("/", bookingControllers.createBooking);
router.get("/", bookingControllers.getBooking);
router.put("/:vehicleId", bookingControllers.updateBooking);

export const bookingRoutes = router;
