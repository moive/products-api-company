import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findOne({ username: req.body.username });

	if (user)
		return res.status(400).json({ message: "The user already exists" });

	const email = await User.findOne({ email: req.body.email });

	if (email)
		return res.status(400).json({ message: "The email already exits" });

	next();
};

export const checkRolesExisted = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				return res.status(400).json({
					message: `Role ${req.body.roles[i]} does not exits`,
				});
			}
		}
	}
	next();
};
