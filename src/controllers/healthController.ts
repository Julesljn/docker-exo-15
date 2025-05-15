import { RequestHandler } from "express";

export default ((req, res) => {
	res.sendStatus(200);
}) satisfies RequestHandler;
