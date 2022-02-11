import express from "express";
import morgan from "morgan";

import { createRoles } from "./libs/initialSetup";

import { pkg } from "./helpers/pkg";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";

const app = express();
createRoles();

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

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
//express validator and joi for validations
