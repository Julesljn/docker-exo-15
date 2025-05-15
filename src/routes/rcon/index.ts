import { Router } from "express";

import rconController from "$app/controllers/rconController";

export default Router().post("/", rconController);
