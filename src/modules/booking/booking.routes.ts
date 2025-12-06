import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", auth("admin", "customer"), bookingControllers.createBooking);
router.get("/", bookingControllers.getBooking);
router.put("/:vehicleId", bookingControllers.updateBooking);

export const bookingRoutes = router;
