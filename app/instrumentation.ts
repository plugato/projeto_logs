/*instrumentation.ts*/
import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";

import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
// import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";

// const provider = new NodeTracerProvider();
// provider.register();

// registerInstrumentations({
//   instrumentations: [
//     new PinoInstrumentation({
//       // Optional hook to insert additional context to log object.
//       logHook: (span, record, level) => {
//         logger.info("teste");
//         record["resource.service.name"] =
//           provider.resource.attributes["service.name"];
//       },

//       // Log span context under custom keys
//       // This is optional, and will default to "trace_id", "span_id" and "trace_flags" as the keys
//       logKeys: {
//         traceId: "traceId",
//         spanId: "spanId",
//         traceFlags: "traceFlags",
//       },
//     }),
//     // other instrumentations
//   ],
// });

import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
// import {
//   ConsoleSpanExporter,
//   SimpleSpanProcessor,
// } from "@opentelemetry/sdk-trace-base";
import { logger } from "./pino-logger";
const URL = "http://192.168.2.135:4318";
const NAME = "projeto_logs2";

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: NAME,
    [SEMRESATTRS_SERVICE_VERSION]: "1.0",
  }),
  traceExporter: new OTLPTraceExporter({
    url: `${URL}/v1/traces`,
    headers: {},
  }),

  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${URL}/v1/metrics`,
      headers: {},
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

export default sdk;
