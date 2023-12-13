import { Router } from "express";
import { methods as authenticationControllers } from "../controllers/authentication.controller";

const router=Router();

router.post('/', authenticationControllers.authenticateUser)

export default router;