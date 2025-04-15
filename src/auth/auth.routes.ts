import { Router } from "express";
import authController from "./auth.controller";
import checkEmailExists from "../middlewares/users/checkEmailExist";
import validUserDto from "../middlewares/users/validIUserDto";
const router = Router();

router.post(
  "/register",
  validUserDto,
  checkEmailExists,
  authController.register
);
router.post("/login", validUserDto, authController.login);

export default router;
