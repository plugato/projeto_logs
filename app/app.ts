import "./instrumentation"; //sempre deixar aqui

import express, { Express } from "express";
import { httpLogger, logger } from "./pino-logger";
const PORT: number = parseInt(process.env.PORT || "8080");
const app: Express = express();

app.use(httpLogger);

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/rolldice", (req, res) => {
  logger.info("aeeeeeeeeeeee");

  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
