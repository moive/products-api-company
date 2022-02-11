import { NextFunction, Request, Response } from "express";
import Role, { ROLES } from "../models/Role";
import User from "../models/User";

interface IRole {
	name: string;
}

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

export const checkRolesExisted = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const rolesDB: () => Promise<IRole[]> = async () => {
		const roles: IRole[] = await (
			await Role.find()
		).map((role) => role.name);
		return roles;
	};

	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!(await rolesDB()).includes(req.body.roles[i])) {
				return res.status(400).json({
					message: `Role ${req.body.roles[i]} does not exits`,
				});
			}
		}
	}
	next();
};
