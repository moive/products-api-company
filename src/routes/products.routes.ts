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

router.get('/:Id', getProductById);

router.put('/:Id', updatedProductById);

router.delete('/:Id', deleteProductById);

export default router;
