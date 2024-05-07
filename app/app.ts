import "./instrumentation"; //sempre deixar aqui

const logger = require("./logger");
import express, { Express } from "express";
import { context } from "@opentelemetry/api";
const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();
const { trace } = require("@opentelemetry/api");

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/error", (req, res) => {
  throw new Error();
});
app.get("/rolldice", (req, res) => {
  const random = getRandomNumber(1, 6).toString();
  const span = trace.getSpan(context.active());

  span.setAttribute("source", "nodejs");
  const { spanId, traceId } = span.spanContext();
  span.setAttribute("spanId", spanId);
  span.setAttribute("traceId", traceId);

  span.setAttribute("span_Id", spanId);
  span.setAttribute("trace_Id", traceId);
  console.log({ spanId, traceId });
  span.setAttribute("custom_attribute", "123mudar");
  span.setAttribute("msg", "mensagem aqui");
  span.addEvent("custom_event", { event_attr: random });
  span.addEvent("Hello API Called", { randomIndex: 1 });

  logger.info("aeeeeeeeeeeee");
  logger.log("info", "Hello simple log!");
  logger.info("Hello log with metas", { color: "blue" });

  span.addEvent("some log", {
    "log.severity": "error",
    "log.message": "Data not found",
  });
  span.end();

  res.send(random);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
