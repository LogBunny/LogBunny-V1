import { Request, Response } from "express";
import LogData from "../validator/log";
import { LogsQueue } from "../utils/bullmq_utils";

class IngestLogs {
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
    res.send({ meow: validatedData });
  }
}

export default IngestLogs;
