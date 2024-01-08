import { Router } from "express";
import { methods as usersControllers } from "../controllers/users.controller";

const router=Router();

router.get('/', usersControllers.getUsers);
router.post('/add', usersControllers.addUsers);
router.post('/delete', usersControllers.deleteUsers);

export default router;