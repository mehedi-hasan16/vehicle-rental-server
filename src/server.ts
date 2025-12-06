import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();
const port = config.port;

//parser
app.use(express.json());

//datbase call
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("vehicle server is running");
});

//user CURD
app.use("/api/v1/users", userRoutes);

// vehicle CURD
app.use("/api/v1/vehicles", vehicleRoutes);

// booking CURD
app.use("/api/v1/bookings", bookingRoutes);

//auth routes
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
