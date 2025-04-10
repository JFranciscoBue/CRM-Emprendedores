import { Router } from "express";
import clientsController from "./clients.controller";
const router = Router();

router.get("/", clientsController.getAllClients);
router.get("/:id", clientsController.getClientById);
router.get("/getByUser", clientsController.getClientsByUser);
router.post("/", clientsController.addClient);
router.patch("/addNote", clientsController.addNoteToClient);
router.put("/update", clientsController.updateClient);
router.delete("/:id", clientsController.deleteClient);

export default router;
