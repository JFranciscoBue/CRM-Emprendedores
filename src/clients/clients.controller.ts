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
    try {
      const clients = await clientService.getClientsByUser(req.body);

      if (clients.length === 0)
        res.status(200).send("You have not any client yet. Add One Now.");

      res.status(200).json(clients);
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
      if (!(await clientService.getClientById(req.params.id))) {
        res.status(404).json(`Client with id: ${req.params.id} has not exist`);
      }
      res.status(200).json(await clientService.getClientById(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  updateClient: async (req: Request, res: Response) => {
    const { id, data } = req.body;
    try {
      if (!(await clientService.updateClient(id, data))) {
        res.status(404).json(`Client with id: ${id} has not exist`);
      }
      res.status(200).json(await clientService.updateClient(id, data));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  deleteClient: async (req: Request, res: Response) => {
    try {
      if (!(await clientService.deleteClient(req.params.id))) {
        res.status(404).json(`Client with id: ${req.params.id} has not exist`);
      }
      res.status(200).json(await clientService.deleteClient(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },
};

export default controller;
