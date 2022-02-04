export const httpError = (res, err, msgError) => {
	console.log(err);
	res.send({ msgError });
};
