import logger from "$app/utils/logger";
import { ServerError, QueryMethodError } from "$app/utils/errors";

import type { RequestHandler, ErrorRequestHandler } from "express";

export const trigger = ((req, res, next) => {
	next(new QueryMethodError(`${req.method} not allowed at ${req.path}`));
}) satisfies RequestHandler;

export const handler = ((err, req, res, next) => {
	const { message, status } =
		err instanceof Error ? new ServerError(`${err.name}: ${err.message}`) : err;

	logger.error(err);

	res.status(status).json({
		message,
		status
	});
}) satisfies ErrorRequestHandler;
