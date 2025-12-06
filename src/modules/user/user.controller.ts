import { Request, Response } from "express";
import { userService } from "./user.service";

// update user
const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  const id = req.params.userId;
  try {
    const result = await userService.updateUser(
      name,
      email,
      phone,
      role,
      id as string
    );
    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get user
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  try {
    const result = await userService.deleteUser(id!);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      // data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  updateUser,
  deleteUser,
  getUser,
};
