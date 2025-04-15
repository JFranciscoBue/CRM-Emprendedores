import { Request, Response } from "express";
import clientService from "./clients.service";

const controller = {
  getAllClients: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await clientService.getAllClients());
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  getClientsByUser: async (req: Request, res: Response) => {
    console.log("PARAMS:", req.params);
    const { userId } = req.params;
    try {
      res.status(200).json(await clientService.getClientsByUser(userId));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  addClient: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await clientService.addClient(req.body));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  addNoteToClient: async (req: Request, res: Response) => {
    const { clientId, note } = req.body;
    try {
      res.status(200).json(await clientService.addNoteToClient(clientId, note));
    } catch (error: any) {
      res.status(404).json(error.message);
    }
  },

  getClientById: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await clientService.getClientById(req.params.id));
    } catch (error: any) {
      res.status(404).json(error.message);
    }
  },

  updateClient: async (req: Request, res: Response) => {
    const { id, data } = req.body;
    try {
      res.status(200).json(await clientService.updateClient(id, data));
    } catch (error: any) {
      res.status(404).json(error.message);
    }
  },

  deleteClient: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await clientService.deleteClient(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },
};

export default controller;
