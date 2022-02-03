import { Router } from 'express';
import {
	createProduct,
	getProducts,
	getProductById,
	updatedProductById,
	deleteProductById
} from '../controllers/products.controller';

const router = Router();

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', updatedProductById);

router.delete('/:id', deleteProductById);

export default router;
