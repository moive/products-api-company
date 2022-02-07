import { Request, Response } from "express";
import { httpError } from "../helpers/handleError";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
	try {
		const { username, email, password, roles } = req.body;

		const newUser = new User({
			username,
			email,
			password: await User.encryptPassword(password),
		});
		console.log(newUser);
		const savedUser = await newUser.save();

		const token = jwt.sign({ id: savedUser._id }, `${process.env.SECRET}`, {
			expiresIn: 86400, // 24 hrs
		});

		res.status(200).json(token);
	} catch (err) {
		httpError(res, err, "Server Error");
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		res.json("signin");
	} catch (err) {
		httpError(res, err, "Server Error");
	}
};