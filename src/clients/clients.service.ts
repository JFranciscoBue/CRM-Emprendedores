import { Document } from "mongoose";
import { IClientDto } from "../dto/Client.dto";
import Client from "../models/Client.model";

const service = {
  getAllClients: async (): Promise<Document[]> => {
    return await Client.find();
  },

  getClientsByUser: async (userId: string): Promise<Document[]> => {
    const userClients = await Client.find({ userId });

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

  getClientById: async (id: string): Promise<Document | null> => {
    return await Client.findById(id);
  },

  updateClient: async (
    id: string,
    data: Partial<IClientDto>
  ): Promise<Document | null> => {
    return await Client.findByIdAndUpdate(id, data, { new: true });
  },

  deleteClient: async (id: string): Promise<Document | null> => {
    return await Client.findByIdAndDelete(id, { new: true });
  },

  searchClients: async (query: string) => {},
};

export default service;
