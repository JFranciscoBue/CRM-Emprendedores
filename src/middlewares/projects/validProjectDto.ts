import { Request, Response, NextFunction } from "express";

const validProjectDto = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { title, status, clientId, userId } = req.body;
  const errors: { [key: string]: string } = {};

  if (!title || !status || !clientId || !userId) {
    errors.fields = "Por favor Completa todos los campos";
  }

  if (title.length < 5) {
    errors.title = "The title has be longer than 5 characters";
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export default validProjectDto;
