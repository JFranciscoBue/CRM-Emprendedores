import { config } from "dotenv";
config();
import userModel from "../models/User.model";
import { IUserDto } from "../dto/User.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const authService = {
  register: async (credentials: IUserDto): Promise<Object> => {
    const createdUser = new userModel({
      ...credentials,
      password: await bcrypt.hash(credentials.password, 10),
    });
    await createdUser.save();

    return { createdUser };
  },

  login: async (credentials: IUserDto): Promise<Object> => {
    const user = await userModel.findOne({ email: credentials.email });
    if (!user) throw new Error();

    const validPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!validPassword) throw new Error();

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user,
    };
  },
};

export default authService;
