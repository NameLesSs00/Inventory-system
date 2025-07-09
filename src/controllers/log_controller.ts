import { Request, Response } from "express";
import { Log } from "../models/log";

export function getAllLogs(req: Request, res: Response) {
  const logs = Log.getAllLogs();
  res.json(logs);
}
