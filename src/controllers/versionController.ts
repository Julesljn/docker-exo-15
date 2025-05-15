import { version } from "$package.json";
import type { RequestHandler } from "express";

export default ((req, res) => {
	res.status(200).json({ version });
}) satisfies RequestHandler;
