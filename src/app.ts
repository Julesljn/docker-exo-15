import http from "http";
import { parse } from "url";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import ws from "ws";
import pinoHttp from "pino-http";

import logger from "$app/utils/logger";
import { HOST, PORT } from "$app/env";
import router from "$app/routes";

import "$app/rcon";
import { rconClient, waitForRconReady } from "$app/rcon";

const wss = new ws.Server({ noServer: true });

wss.on("connection", (ws) => {
	logger.info(`[RCON] New client connected`);

	ws.on("message", async (message) => {
		logger.info("[WS] New message", message.toString());

		const data = JSON.parse(message.toString());

		try {
			const command = data.command;
			await waitForRconReady();
			if (!rconClient) {
				throw new Error("RCON not connected");
			}
			const rconResponse = await rconClient.send(command);

			logger.info(`[RCON] ${command}:${rconResponse}`);

			ws.send(
				JSON.stringify({
					message: rconResponse
				})
			);
		} catch (err) {
			logger.error(err);
		}
	}).on("close", () => {
		logger.info(`Client disconnected`);
	});
});

const app = express()
	.use(
		pinoHttp({
			logger
		})
	)
	.use(cors())
	.use(helmet())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(compression({ threshold: 0 }))
	.use(router);

const server = http.createServer(app).on("upgrade", (req, socket, head) => {
	const { pathname } = parse(req.url ?? "");

	if (pathname !== "/ws") {
		socket.destroy();
		return;
	}

	wss.handleUpgrade(req, socket, head, (ws) => {
		wss.emit("connection", ws, req);
	});
});

process.on("exit", () => {
	if (rconClient) rconClient.end();
});

export default () => {
	server.listen(PORT, HOST, () => {
		logger.info(`Listening on ${HOST}:${PORT}`);
	});
};
