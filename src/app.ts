import express from "express";
import morgan from "morgan";

import { pkg } from "./helpers/pkg";
import productsRoutes from "./routes/products.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.set("pkg", pkg);

app.get("/", (req, res) => {
	res.json({
		name: app.get("pkg").name,
		description: app.get("pkg").description,
		author: app.get("pkg").author,
	});
});

app.use("/products", productsRoutes);

export default app;
