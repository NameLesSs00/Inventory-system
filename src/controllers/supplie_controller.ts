import { Request, Response } from "express";
import { Supplie } from "../models/supplie"; 
import { Log } from "../models/log";

export function getAllSupplies(req: Request, res: Response) {
  res.json(Supplie.getAllSupplies());
}

export function addSupply(req: Request, res: Response) {
  const { name, tags, quantity, refill_number_alert } = req.body;

  if (!name || !tags || quantity === undefined || refill_number_alert === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newSupply = Supplie.addSupply(name, tags, quantity, refill_number_alert);

  if (!newSupply) {
    return res.status(400).json({ error: `Supply with name "${name}" already exists.` });
  }

  Log.addLog(newSupply.id, quantity, false);

  return res.status(201).json(newSupply);
}
