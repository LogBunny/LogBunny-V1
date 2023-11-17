import { Request, Response } from "express";
import LogData from "../validator/log";
import { LogsQueue } from "../utils/bullmq_utils";
import { PubSub, RedisClient } from "../utils/redis_utils";

class Logs {
  public static CreateNewLog(req: Request, res: Response) {
    console.log(req.body);
    let validatedData;
    try {
      validatedData = LogData.parse(req.body);
    } catch (error) {
      return res
        .status(400)
        .send({ error: "failed to parse request body:", log: error });
    }
    LogsQueue.add("log", validatedData);
    RedisClient.publish("log", JSON.stringify(validatedData));
    return res.status(201).send({ status: "added" });
  }

  public static StreamLogs(req: Request, res: Response) {
    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    const generate = (message: any) => {
      res.write(`data: ${message}\n\n`);
    };
    PubSub.subscribe("log", (msg) => {
      res.write(`data: ${msg}\n\n`);
    });
    req.on("close", () => {
      PubSub.removeListener("message", generate);
      res.end();
    });
  }
}

export default Logs;
