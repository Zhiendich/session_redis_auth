import { Router } from "express";
import authController from "../controllers/authController";
import { checkAuth } from "../middleware/checkAuth";
import { checkCache } from "../middleware/checkCache";

const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/getUser", checkAuth, checkCache, authController.getUser);

export default router;
