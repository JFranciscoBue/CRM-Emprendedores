import { Request, Response, NextFunction } from "express";
import userModel from "../../models/User.model";

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email already exist" });
  }

  next();
};

export default checkEmailExists;
