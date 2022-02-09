import { Router } from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	updatedProductById,
	deleteProductById,
} from "../controllers/products.controller";

import { verifyToken } from "../middlewares/";

const router = Router();

router.post("/", verifyToken, createProduct);

router.get("/", getProducts);

router.get("/:Id", verifyToken, getProductById);

router.put("/:Id", verifyToken, updatedProductById);

router.delete("/:Id", verifyToken, deleteProductById);

export default router;
