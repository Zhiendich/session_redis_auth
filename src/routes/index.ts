import { Router } from "express";
import authController from "../controllers/authController";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/registration", authController.registration);
router.post("/login", authController.login);
router.post("/getUser", checkAuth, authController.getUser);

export default router;
