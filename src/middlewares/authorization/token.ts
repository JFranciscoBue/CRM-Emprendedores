import { config as envConfig } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

envConfig({ path: ".env" });

const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tokenParts = req.headers["authorization"]?.split(" ");

  if (!tokenParts || tokenParts.length !== 2) {
    res.status(401).json({ message: "You are not Authorized for this action" });
    return;
  }

  try {
    jwt.verify(tokenParts[1], process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};

export default tokenValidation;
