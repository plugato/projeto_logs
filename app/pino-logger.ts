import { createWriteStream } from "pino-http-send";
import pinoHttp from "pino-http";
//import pino from "pino";

//const logger = pino();
//import pino from "pino-http";
const stream = createWriteStream({
  url: "http://192.168.2.135:8082",
  log: true,
  interval: 100,
  retries: 4,
});

// const logger = pinoHttp(
//   {
//     level: "info",
//   },

//   stream
// );
//logger.info("aaaaaaaaa");
const httpLogger = pinoHttp({});
const logger = httpLogger.logger;
export { httpLogger, logger };
