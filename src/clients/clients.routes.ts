import { Router } from "express";
import clientsController from "./clients.controller";
import validNote from "../middlewares/clients/validNote";
import validClientDto from "../middlewares/clients/validIClientDto";
const router = Router();

router.get("/getByUser/:userId", clientsController.getClientsByUser);
router.get("/:id", clientsController.getClientById);
router.get("/", clientsController.getAllClients);
router.post("/", validClientDto, clientsController.addClient);
router.patch("/addNote", validNote, clientsController.addNoteToClient);
router.put("/update", clientsController.updateClient);
router.delete("/:id", clientsController.deleteClient);

export default router;
