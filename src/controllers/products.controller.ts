import Product from '../models/Product';
import { httpError } from '../helpers/handleError';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, category, price, imgURL } = req.body;
		const newProd = new Product({ name, category, price, imgURL });
		const prodSaved = await newProd.save();
		res.status(201).json(prodSaved);
	} catch (err) {
		httpError(res, err, 'Server Error');
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		httpError(res, err, 'Not found');
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const product = await Product.findById(req.params.Id);
		res.status(200).json(product);
	} catch (err) {
		httpError(res, err, 'Not Found');
	}
};

export const updatedProductById = async (req: Request, res: Response) => {
	try {
		const updateProduct = await Product.findByIdAndUpdate(req.params.Id, req.body, {
			new: true
		});
		res.status(200).json(updateProduct);
	} catch (err) {
		httpError(res, err, 'Server Error');
	}
};

export const deleteProductById = async (req: Request, res: Response) => {
	try {
		const producDeleted = await Product.findByIdAndDelete(req.params.Id);
		res.status(200).json(producDeleted);
	} catch (err) {
		httpError(res, err, 'Server Error');
	}
};

// npm i busboy ---> uploaded images
// npm i multer ---> upload images
