import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;
  console.log(name, email, password, phone, role);
  try {
    const result = await authService.createUser(
      name,
      email,
      password,
      phone,
      role
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get login user data
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // console.log(email, password);

  try {
    const result = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  createUser,
  loginUser,
};
