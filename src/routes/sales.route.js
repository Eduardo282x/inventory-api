import { Router } from "express";
import { methods as salesControllers } from "../controllers/sales.controller";

const router=Router();

router.post('/', salesControllers.getSale);
router.get('/details', salesControllers.getDetails);
router.post('/add', salesControllers.addSale);
router.post('/facture', salesControllers.getPDFData);

export default router;