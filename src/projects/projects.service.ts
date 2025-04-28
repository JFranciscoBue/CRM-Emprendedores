import { Document } from "mongoose";
import { IProjectDto } from "../dto/Project.dto";
import mongoose from "mongoose";
import Project from "../models/Project.model";
import User from "../models/User.model";
import Client from "../models/Client.model";

const service = {
  getUserProjects: async (userId: string): Promise<Document[] | string> => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid MongoDB ID");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const projects = await Project.find({ userId }).populate("clientId");

    if (projects.length === 0) {
      return [];
    }

    return projects;
  },

  getClientProjects: async (clientId: string): Promise<Document[]> => {
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      throw new Error("Invalid MongoDB ID");
    }

    const projects = await Project.find({ clientId });

    if (projects.length === 0) {
      throw new Error("This client has no projects");
    }

    return projects;
  },

  getOneProject: async (id: string): Promise<Document | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid MongoDB ID");
    }
    const project = await Project.findById(id);

    if (!project) {
      throw new Error("The project doesn´t exist");
    }

    return project;
  },

  createProject: async (data: IProjectDto): Promise<Object> => {
    const addedProject = new Project({
      ...data,
      clientId: data.clientId,
    });
    await addedProject.save();

    // Luego, actualiza el cliente con el nuevo proyecto
    const client = await Client.findById(data.clientId);
    if (client) {
      client.projects.push(addedProject._id);
      await client.save();
    }

    return { addedProject };
  },

  updateProject: async (
    id: string,
    data: Partial<IProjectDto>
  ): Promise<Object> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid MongoDB ID");
    }
    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedProject) {
      throw new Error("Cannot Update the Project");
    }

    return { updatedProject };
  },

  deleteProject: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid MongoDB ID");
    }
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new Error("Cannot Delete the Project");
    }

    return { success: "Deleted" };
  },
};

export default service;
