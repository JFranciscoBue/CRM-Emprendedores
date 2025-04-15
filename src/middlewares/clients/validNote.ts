import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

const validNoteDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { clientId, note } = req.body;

  const errors: Record<string, string> = {};

  if (!clientId || !mongoose.Types.ObjectId.isValid(clientId)) {
    errors.clientId = "Invalid MongoDB ID";
  }

  if (!note || typeof note !== "string") {
    errors.note = "Note is required and must be a string";
  }

  if (note && note.length < 3) {
    errors.note = "Note must be at least 3 characters long";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validNoteDto;
