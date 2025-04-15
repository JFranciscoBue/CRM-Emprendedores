import { Request, Response, NextFunction } from "express";

const validClientUpdateDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, phone } = req.body;

  const errors: Record<string, string> = {};
  const phoneRegex = /^\+\d{2,4}\d{6,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    errors.email = "Invalid Email Format";
  }

  if (phone && !phoneRegex.test(phone)) {
    errors.phone = "Invalid phone Format";
  }

  if (name && name.length < 3) {
    errors.name = "Name must have more than 3 characters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validClientUpdateDto;
