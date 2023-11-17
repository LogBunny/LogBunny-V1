import { Request, Response } from "express";
import LogData from "../validator/log";
import { LogsQueue } from "../utils/bullmq_utils";
import { PubSub, RedisClient } from "../utils/redis_utils";
import { Log } from "../utils/db_utils";

class Logs {
  public static CreateNewLog(req: Request, res: Response) {
    let validatedData;
    try {
      validatedData = LogData.parse(req.body);
    } catch (error) {
      return res
        .status(400)
        .json({ error: "failed to parse request body:", log: error });
    }
    LogsQueue.add("log", validatedData);
    RedisClient.publish("log", JSON.stringify(validatedData));
    return res.status(201).json({ status: "added" });
  }

  public static async GetLogs(req: Request, res: Response) {
    try {
      const filter: Record<string, any> = {};
      if (req.query.level) {
        filter.level = req.query.level;
      }
      if (req.query.msg_regex) {
        filter.message = {
          $regex: new RegExp(req.query.msg_regex.toString(), "i"),
        };
      }
      if (req.query.resource_id) {
        filter.resourceId = req.query.resource_id;
      }
      if (req.query.trace_id) {
        filter.traceId = req.query.trace_id;
      }
      if (req.query.span_id) {
        filter.spanId = req.query.span_id;
      }
      if (req.query.commit) {
        filter.commit = req.query.commit;
      }
      if (req.query.parent_resource_id) {
        filter["metadata.parentResourceId"] = req.query.parent_resource_id;
      }
      if (req.query.timestamp) {
        filter.timestamp = new Date(req.query.timestamp.toString());
      }

      if (req.query.fromTimestamp && req.query.toTimestamp) {
        filter.timestamp = {
          $gte: new Date(req.query.fromTimestamp.toString()),
          $lte: new Date(req.query.toTimestamp.toString()),
        };
      } else if (req.query.fromTimestamp) {
        filter.timestamp = {
          $gte: new Date(req.query.fromTimestamp.toString()),
        };
      } else if (req.query.toTimestamp) {
        filter.timestamp = { $lte: new Date(req.query.toTimestamp.toString()) };
      }

      const logs = await Log.find(filter);
      res.status(200).json({ data: logs });
    } catch (error) {
      console.log("Error fetching logs: ", error);
      res.status(500).json({ error: "Internal server error", log: error });
    }
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
