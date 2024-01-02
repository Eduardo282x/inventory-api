import { Router } from "express";
import { methods as inventoryController } from "../controllers/inventory.controller";

const router=Router();

router.get('/', inventoryController.getInventory)

export default router;