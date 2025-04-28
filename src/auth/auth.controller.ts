import { Request, Response } from "express";
import authService from "./auth.service";

const controller = {
  register: async (req: Request, res: Response) => {
    try {
      const createdUser = await authService.register(req.body);

      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const response = await authService.login(req.body);

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(400).json("Correo Electronico o Contraseña Incorrectos");
    }
  },
};

export default controller;
