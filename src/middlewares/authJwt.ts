import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";

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
		const token = req.headers["x-access-token"];

		if (!token)
			return res.status(403).json({ message: "No token provided" });

		const decoded = jwt.verify(token as string, `${process.env.SECRET}`);

		// req.userId = (decoded as IUserId).id;

		const user = await User.findById((decoded as IUserId).id, {
			password: 0,
		});
		console.log(user);
		if (!user) return res.status(404).json({ message: "No user found" });

		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};
