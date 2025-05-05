import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  notes: [{ type: String }],
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
