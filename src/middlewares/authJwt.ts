import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import Role from "../models/Role";

interface IUserId {
	id: string;
}

interface IGetUserAuthInfoRequest extends Request {
	userId?: string;
}

export const verifyToken = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers["x-access-token"] as string;

		if (!token)
			return res.status(403).json({ message: "No token provided" });

		const decoded = jwt.verify(token, `${process.env.SECRET}`) as IUser;

		req.userId = decoded.id;

		const user = await User.findById(decoded.id, {
			password: 0,
		});
		console.log(user);
		if (!user) return res.status(404).json({ message: "No user found" });

		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

export const isModerator = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user?.roles } });

	for (let i = 0; i < roles.length; i++) {
		if (roles[i].name === "moderator") {
			next();
			return;
		}
	}

	return res.status(403).json({ message: "Require Moderator role" });
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {};
