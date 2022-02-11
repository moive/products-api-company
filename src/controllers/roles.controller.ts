import { Request, Response } from "express";
import { httpError } from "../helpers/handleError";
import Role from "../models/Role";

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await Role.find();
		res.status(200).json(roles);
	} catch (err) {
		httpError(res, err, "Not found");
	}
};
