import { Router } from "express";

import { getUsers, createUser } from "../controllers/users.controller";
import { checkRolesExisted, isAdmin, verifyToken } from "../middlewares";

const router = Router();

router.get("/", getUsers);

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);

export default router;
