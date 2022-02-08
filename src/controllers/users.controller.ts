import { Request, Response } from "express";
import { httpError } from "../helpers/handleError";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().populate("roles");
		res.json(users);
	} catch (err) {
		httpError(res, err, "Not found");
	}
};
