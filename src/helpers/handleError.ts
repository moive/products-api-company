import { Response, ErrorRequestHandler } from "express";

export const httpError = (res: Response, err: ErrorRequestHandler | unknown, msgError: String) => {
	console.log(err);
	res.send({ msgError });
};
