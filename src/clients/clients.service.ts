import { Document } from "mongoose";
import { IClientDto } from "../dto/Client.dto";
import Client from "../models/Client.model";
import mongoose from "mongoose";

const service = {
  getAllClients: async (): Promise<Document[]> => {
    return await Client.find().populate("user");
  },

  getClientsByUser: async (userId: string): Promise<Document[] | string> => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return "Invalid userId";
    }

    const objectUserId = new mongoose.Types.ObjectId(userId);
    console.log(objectUserId);

    const userClients = await Client.find({ user: userId });
    console.log(userClients);

    if (userClients.length === 0) {
      return "You have not any Client Yet. Add one!";
    }

    return userClients;
  },

  addClient: async (data: IClientDto): Promise<Object> => {
    const newClient = new Client(data);
    console.log(newClient);

    await newClient.save();

    return { newClient };
  },

  addNoteToClient: async (clientId: string, note: string): Promise<Object> => {
    const client = await Client.findById(clientId);
    if (!client) throw new Error(`Client with id: ${clientId} has not exist`);

    client.notes.push(note);

    await client.save();

    return { client };
  },

  getClientById: async (id: string): Promise<Object> => {
    const clientFound = await Client.findById(id).populate("projects");
    if (!clientFound) {
      throw new Error(`Client with ID: ${id} hasn't exist`);
    }

    console.log(clientFound.projects);

    return { clientFound };
  },

  updateClient: async (
    id: string,
    data: Partial<IClientDto>
  ): Promise<Object> => {
    const clientUpdated = await Client.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!clientUpdated) throw new Error(`Client with ID: ${id} hasn´t exist`);

    return { clientUpdated };
  },

  deleteClient: async (id: string): Promise<Object> => {
    const clientDeleted = await Client.findByIdAndDelete(id, { new: true });

    if (!clientDeleted) throw new Error("Cannot delete the client. Try Again");

    return { clientDeleted };
  },

  searchClients: async (query: string) => {},
};

export default service;
