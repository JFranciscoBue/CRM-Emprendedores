import { Request, Response, NextFunction } from "express";

const validUserDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  const errors: Record<string, string> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    errors.fields = "All fields must be completed";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Invalid Email Format";
  }

  if (password.length < 3) {
    errors.password = "The password must be more than 3 characters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validUserDto;
