import mongoose, { Schema, model } from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  notes: [{ type: String }],
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
