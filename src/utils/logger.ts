import pino from "pino";

export default pino({
	level: "trace",
	timestamp: pino.stdTimeFunctions.isoTime
});
