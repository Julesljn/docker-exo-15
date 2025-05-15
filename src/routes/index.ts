import { Router } from "express";

import healthController from "$app/controllers/healthController";
import * as errorController from "$app/controllers/errorController";

import RconRouter from "$app/routes/rcon";
import VersionRouter from "$app/routes/version";

export default Router()
	.get("/", healthController)
	.use("/rcon", RconRouter)
	.use("/version", VersionRouter)
	.use(errorController.trigger)
	.use(errorController.handler);
