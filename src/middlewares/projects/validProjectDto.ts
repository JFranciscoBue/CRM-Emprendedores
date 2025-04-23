import { Request, Response, NextFunction } from "express";

const validProjectDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, description, status, deadline, clientId, userId } = req.body;
  const errors: { [key: string]: string } = {};

  if (!title || !description || !status || !deadline || !clientId || !userId) {
    errors.fields = "All fields must be completed";
  }

  if (title.length < 5) {
    errors.title = "The title has be longer than 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    res.json(404).json({ errors });
    return;
  }

  next();
};

export default validProjectDto;
