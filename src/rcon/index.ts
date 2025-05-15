import { Rcon } from "rcon-client";

import { RCON_HOST, RCON_PASSWORD, RCON_PORT } from "$app/env";
import logger from "$app/utils/logger";

export let rconClient: Rcon | undefined = undefined;
let rconReadyResolve: (() => void) | null = null;
export const rconReady = new Promise<void>((resolve) => {
	rconReadyResolve = resolve;
});

Rcon.connect({
	host: RCON_HOST,
	port: RCON_PORT,
	password: RCON_PASSWORD
})
	.then((client) => {
		rconClient = client;

		logger.info(`[RCON] connected to ${RCON_HOST}:${RCON_PORT}`);
		if (rconReadyResolve) rconReadyResolve();
	})
	.catch((err) => {
		logger.error(err);
	});

export async function waitForRconReady(timeout = 15000) {
	let timer: NodeJS.Timeout;
	return Promise.race([
		rconReady,
		new Promise((_, reject) => {
			timer = setTimeout(() => reject(new Error("RCON connection timeout")), timeout);
		})
	]).finally(() => clearTimeout(timer));
}
