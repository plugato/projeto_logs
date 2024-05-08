import { createWriteStream } from "pino-http-send";
import pinoHttp from "pino-http";

const httpLogger = pinoHttp({});
const logger = httpLogger.logger;
export { httpLogger, logger };
