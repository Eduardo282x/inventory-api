import { Router } from "express";
import { methods as inventoryController } from "../controllers/inventory.controller";

const router=Router();

router.get('/', inventoryController.getInventory);
router.get('/abc', inventoryController.getInventoryABCExcel);
router.post('/add', inventoryController.addArticleInventory);
router.post('/edit', inventoryController.editArticleInventory);

export default router;