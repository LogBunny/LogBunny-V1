import { Request, Response } from "express";

class IngestLogs {
  public static CreateNewLog(req: Request, res: Response) {
    res.send({ meow: "honk" });
  }
}

export default IngestLogs;
