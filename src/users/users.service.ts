import User from "../models/User.model";
import cloudinary from "../cloudinary";
import * as bcrypt from "bcrypt";

const service = {
  uploadProfile: async (id: string, localImagePath: string) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    const result = await cloudinary.uploader.upload(localImagePath, {
      folder: "profile_pictures",
      public_id: `${id}_profile`,
      overwrite: true,
    });

    user.imgProfile = result.secure_url;
    await user.save();

    return user;
  },
  changePassword: async (id: string, newPassword: string): Promise<Object> => {
    const userFound = await User.findById(id);

    if (!userFound) throw new Error();

    userFound.password = await bcrypt.hash(newPassword, 10);
    await userFound.save();

    return { message: "Contraseña cambiada correctamente" };
  },
};

export default service;
