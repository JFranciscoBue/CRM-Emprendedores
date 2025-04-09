import { Router } from "express";
import authController from "./auth.controller";
import checkEmailExists from "../middlewares/users/checkEmailExist";
const router = Router();

router.post("/register", checkEmailExists, authController.register);
router.post("/login", authController.login);

export default router;
