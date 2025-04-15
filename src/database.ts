import mongoose from "mongoose";
import "dotenv/config";

const DBConnection = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
};

export default DBConnection;
