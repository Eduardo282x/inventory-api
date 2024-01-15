import { Router } from "express";
import { methods as salesControllers } from "../controllers/sales.controller";

const router=Router();

router.get('/', salesControllers.getSale);
router.post('/add', salesControllers.addSale);

export default router;