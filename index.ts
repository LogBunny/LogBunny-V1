import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Logs from "./controllers/ingest";
import DBInit from "./utils/db_utils";
import BullMQInit, { SetUpWorker } from "./utils/bullmq_utils";
import RedisInit from "./utils/redis_utils";
import cron from "node-cron";

dotenv.config();

DBInit();
BullMQInit();
RedisInit();
const worker = SetUpWorker();
cron.schedule("*/5 * * * *", async () => {
  await worker.run();
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());
app.post("/ingest", Logs.CreateNewLog);
app.get("/stream", Logs.StreamLogs);
app.get("/logs", Logs.GetLogs);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
