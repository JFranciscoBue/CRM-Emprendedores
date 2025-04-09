import mongoose from "mongoose";

const DBConnection = async () => {
  await mongoose.connect("mongodb://localhost:27017/crm-emprendedores");
};

export default DBConnection;
