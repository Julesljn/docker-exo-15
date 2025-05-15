import { Router } from "express";

import versionController from "$app/controllers/versionController";

export default Router().get("/", versionController);
