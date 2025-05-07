import { Request, Response } from "express";
import usersService from "./users.service";

const controller = {
  uploadProfileImage: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const result = await usersService.uploadProfile(id, req.file.path);
      res
        .status(200)
        .json({ message: "Foto de Perfil Actualizada Correctamente", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
  changePassword: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
      const response = await usersService.changePassword(id, password);
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};

export default controller;
