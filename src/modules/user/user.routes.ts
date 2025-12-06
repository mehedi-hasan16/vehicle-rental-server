import { Router } from "express";
import { userControllers } from "./user.controller";

const router = Router();

router.post("/signup", userControllers.createUser);
router.get("/signin", userControllers.getUser);

export const userRoutes = router;
