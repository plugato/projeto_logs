import * as opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { Resource } from "@opentelemetry/resources";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import pino from "pino";
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import * as logsAPI from "@opentelemetry/api-logs";
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";

// Constantes de configuração
const OTLP_COLLECTOR_URL = "http://otel-collector:4318";
const SERVICE_NAME = "projeto_logs3";

// Criação de recursos
const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: SERVICE_NAME,
  [SEMRESATTRS_SERVICE_VERSION]: "1.0",
});

// Configuração do provedor de logs
const loggerProvider = new LoggerProvider({
  resource,
});
loggerProvider.addLogRecordProcessor(
  new SimpleLogRecordProcessor(
    new OTLPLogExporter({
      url: OTLP_COLLECTOR_URL,
      keepAlive: true,
    })
  )
);

// Criação do logger
const loggerOtel = loggerProvider.getLogger("default");

// Emite um log de teste
loggerOtel.emit({
  severityNumber: logsAPI.SeverityNumber.INFO,
  severityText: "INFO",
  body: "test",
  attributes: { "log.type": "LogRecord" },
});

// Configuração do SDK do OpenTelemetry
const sdk = new opentelemetry.NodeSDK({
  resource: resource,
  traceExporter: new OTLPTraceExporter({
    url: `${OTLP_COLLECTOR_URL}/v1/traces`,
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${OTLP_COLLECTOR_URL}/v1/metrics`,
      headers: {},
    }),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    // new ExpressInstrumentation(),
  ],
});
sdk.start();

// Criação do logger Pino para uso
const logger = pino();

// Exporta os componentes necessários
export default { sdk, logger };
