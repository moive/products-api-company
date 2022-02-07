import { Request, Response } from "express";
import { httpError } from "../helpers/handleError";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import Role from "../models/Role";

export const signUp = async (req: Request, res: Response) => {
	try {
		const { username, email, password, roles } = req.body;

		const newUser = new User({
			username,
			email,
			password: await User.encryptPassword(password),
		});
		console.log(newUser);

		if (roles) {
			const foundRoles = await Role.find({ name: { $in: roles } });
			newUser.roles = foundRoles.map((role) => role._id);
		} else {
			const role = await Role.findOne({ name: "user" });
			newUser.roles = [role._id];
		}

		const savedUser = await newUser.save();
		console.log(savedUser);

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
		const userFound = await User.findOne({
			email: req.body.email,
		}).populate("roles");

		if (!userFound)
			return res.status(400).json({ message: "User not found." });

		const matchPassword = await User.comparePassword(
			req.body.password,
			userFound.password
		);

		if (!matchPassword)
			return res
				.status(401)
				.json({ token: null, message: "Invalid password" });

		console.log(userFound);

		const token = jwt.sign({ id: userFound._id }, `${process.env.SECRET}`, {
			expiresIn: 86400,
		});

		res.json({ token });
	} catch (err) {
		httpError(res, err, "Server Error");
	}
};
