import "./instrumentation"; //sempre deixar aqui

import express, { Express } from "express";
import { httpLogger, logger } from "./pino-logger";
import { context } from "@opentelemetry/api";
const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();
const { trace } = require("@opentelemetry/api");
app.use(httpLogger);

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/rolldice", (req, res) => {
  const random = getRandomNumber(1, 6).toString();
  const span = trace.getSpan(context.active());

  span.setAttribute("custom_attribute", "123mudar");
  span.setAttribute("msg", "mensagem aqui");
  span.addEvent("custom_event", { event_attr: random });

  logger.info("aeeeeeeeeeeee");

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
