import { Router } from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updatedProductById,
	deleteProductById,
} from "../controllers/products.controller";

import { verifyToken, isModerator, isAdmin } from "../middlewares/";

const router = Router();

router.post("/", [verifyToken, isModerator], createProduct);

router.get("/", getProducts);

router.get("/:Id", getProductById);

router.put("/:Id", [verifyToken, isAdmin], updatedProductById);

router.delete("/:Id", [verifyToken, isAdmin], deleteProductById);

export default router;
