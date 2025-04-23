import { Router } from "express";
import projectsController from "./projects.controller";
import validProjectDto from "../middlewares/projects/validProjectDto";
const router = Router();

router.get("/userProjects/:id", projectsController.getUserProjects);
router.get("/client/:clientId", projectsController.getClientProjects);
router.get("/:id", projectsController.getOneProject);

router.post("/", validProjectDto, projectsController.createProject);

router.put("/:id", projectsController.updateProject);

router.delete("/:id", projectsController.deleteProject);

export default router;
