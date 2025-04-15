import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const validClientDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, phone, userId } = req.body;

  const errors: { [key: string]: string } = {};

  const phoneRegex = /^\+\d{2,4}\d{6,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !userId) {
    errors.fields = "All fields must be completed";
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    errors.userId = "Invalid MongoDB ID";
  }

  if (!phoneRegex.test(phone)) {
    errors.phone = "Invalid phone Format";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Invalid Email Format";
  }

  if (name.length < 3) {
    errors.name = "Name must have more than 3 characters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validClientDto;
