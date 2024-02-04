import { Router } from "express";
import { methods as clientControllers } from "../controllers/client.controller";

const router=Router();

router.get('/', clientControllers.getClients);
router.post('/add', clientControllers.addClient);
router.post('/edit', clientControllers.editClient);
router.post('/delete', clientControllers.deleteClient);

export default router;