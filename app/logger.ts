const winston = require("winston");
const opentelemetry = require("@opentelemetry/api");

const tracingFormat = function () {
  return winston.format((info: { [x: string]: string }) => {
    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if (span) {
      const { spanId, traceId } = span.spanContext();
      const traceIdEnd = traceId.slice(traceId.length / 2);
      info["dd.trace_id"] = BigInt(`0x${traceIdEnd}`).toString();
      info["dd.span_id"] = BigInt(`0x${spanId}`).toString();
    }
    return info;
  })();
};

const logger = winston.createLogger({
  level: "debug",

  format: winston.format.combine(tracingFormat(), winston.format.json()),
  transports: [new winston.transports.Console()],
});

logger.add(new winston.transports.File({ filename: "./logs/logs.log" }));

module.exports = logger;
