import { Router } from "express";
import upload from "../middlewares/users/imageUpload";
import useresController from "./users.controller";
const router = Router();

router.patch(
  "/uploadImage/:id",
  upload.single("image"),
  useresController.uploadProfileImage
);
router.patch("/changePassword/:id", useresController.changePassword);

export default router;
