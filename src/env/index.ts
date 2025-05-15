import * as dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST ?? "localhost";
export const PORT = parseInt(process.env.PORT ?? "3000");
export const RCON_HOST = process.env.RCON_HOST ?? "localhost";
export const RCON_PORT = parseInt(process.env.RCON_PORT ?? "25575");
export const RCON_PASSWORD = process.env.RCON_PASSWORD ?? "secret";
