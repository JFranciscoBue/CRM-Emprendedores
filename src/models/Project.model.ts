import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    deadline: { type: Date, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);

export default Project;
