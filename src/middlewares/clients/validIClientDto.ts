import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const validClientDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, phone, user } = req.body;

  const errors: { [key: string]: string } = {};

  const phoneRegex = /^\+\d{2,4}\d{6,12}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !phone || !user) {
    errors.fields = "Deben Completarse todos los campos";
  }

  if (!mongoose.Types.ObjectId.isValid(user)) {
    errors.userId = "ID Invalido";
  }

  if (!phoneRegex.test(phone)) {
    errors.phone = "Formato de Telefono Incorrecto";
  }

  if (!emailRegex.test(email)) {
    errors.email = "Formato de Correo Electronico Incorrecto";
  }

  if (name.length < 3) {
    errors.name = "El nombre debe tener minimo 3 caracteres";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validClientDto;
