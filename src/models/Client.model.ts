import { Schema, model } from "mongoose";

const clientSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Client = model("Client", clientSchema);

export default Client;
