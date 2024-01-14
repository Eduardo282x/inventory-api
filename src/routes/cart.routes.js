import { Router } from "express";
import { methods as cartControllers } from "../controllers/cart.controller";

const router=Router();

router.get('/', cartControllers.getCarts);
router.post('/add', cartControllers.addCarts);
router.post('/edit', cartControllers.editCart);
router.post('/delete', cartControllers.deleteCart);

export default router;