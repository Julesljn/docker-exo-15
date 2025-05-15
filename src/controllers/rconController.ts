import { QueryFieldError } from "$app/utils/errors";
import type { RequestHandler } from "express";

import logger from "$app/utils/logger";
import { rconClient, waitForRconReady } from "$app/rcon";

export default (async (req, res, next) => {
	const { command } = req.body;

	try {
		if (!command) throw new QueryFieldError("Missing field command");

		await waitForRconReady();
		if (!rconClient) {
			throw new Error("RCON not connected");
		}
		const rconResponse = await rconClient.send(command);

		logger.info(`[RCON] ${command}:${rconResponse}`);

		res.status(200).json({
			message: rconResponse
		});
	} catch (err) {
		next(err);
	}
}) satisfies RequestHandler;
