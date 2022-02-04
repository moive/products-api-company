import Product from '../models/Product';

export const createProduct = async (req, res) => {
	const { name, category, price, imgURL } = req.body;
	const newProd = new Product({ name, category, price, imgURL });
	const prodSaved = await newProd.save();
	res.status(201).json(prodSaved);
};

export const getProducts = async (req, res) => {
	const products = await Product.find();
	res.json(products);
};

export const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.Id);
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
};

export const updatedProductById = async (req, res) => {
	const updateProduct = await Product.findByIdAndUpdate(req.params.Id, req.body, {
		new: true
	});

	res.status(200).json(updateProduct);
};

export const deleteProductById = async (req, res) => {
	const producDeleted = await Product.findByIdAndDelete(req.params.Id);
	res.status(200).json(producDeleted);
};

// npm i busboy ---> uploaded images
// npm i multer ---> upload images
