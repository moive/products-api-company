import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";
import {
	checkDuplicateUsernameOrEmail,
	checkRolesExisted,
} from "../middlewares";
const router = Router();

router.post(
	"/signup",
	[checkDuplicateUsernameOrEmail, checkRolesExisted],
	signUp
);
router.post("/signin", signIn);

export default router;
