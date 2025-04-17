import { Request, Response } from "express";
import projectsService from "./projects.service";

const controller = {
  getUserProjects: async (req: Request, res: Response) => {
    try {
      res
        .status(200)
        .json(await projectsService.getUserProjects(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  getClientProjects: async (req: Request, res: Response) => {
    try {
      const projects = await projectsService.getClientProjects(
        req.params.clientId
      );
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  getOneProject: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await projectsService.getOneProject(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  createProject: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await projectsService.createProject(req.body));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  updateProject: async (req: Request, res: Response) => {
    try {
      res
        .status(200)
        .json(await projectsService.updateProject(req.params.id, req.body));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },

  deleteProject: async (req: Request, res: Response) => {
    try {
      res.status(200).json(await projectsService.deleteProject(req.params.id));
    } catch (error: any) {
      res.status(400).json(error.message);
    }
  },
};

export default controller;
