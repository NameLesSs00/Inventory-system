import { Request, Response } from "express";
import { Supplie, Supplies } from "../models/supplie";
import { Log } from "../models/log";

export function getAllSupplies(req: Request, res: Response) {
  res.json(Supplie.getAllSupplies());
}

export function addSupply(req: Request, res: Response) {
  const { name, tags, quantity, refill_number_alert } = req.body;

  if (
    !name ||
    !tags ||
    quantity === undefined ||
    refill_number_alert === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newSupply = Supplie.addSupply(
    name,
    tags,
    quantity,
    refill_number_alert
  );

  if (!newSupply) {
    return res
      .status(400)
      .json({ error: `Supply with name "${name}" already exists.` });
  }

  Log.addLog(newSupply.id, quantity, false);

  return res.status(201).json(newSupply);
}

export function getSupplieById(req: Request, res: Response) {
  let findId: number = Number(req.params.Id);
  let itemfound = Supplies.find((it) => it.id === findId);
  if (!itemfound) {
    return res.json({ error: true, msg: "no such id is found." });
  } else {
    return res.json(itemfound);
  }
}

export const sellSupplie = (req: Request, res: Response) => {
  const { Id, amountSold } = req.body;
  let obj = Supplies.find((it) => it.id === Number(Id));

  if (!obj) {
    return res.json({ error: true, msg: "no such id is found." });
  }
  if (obj.quantity >= Number(amountSold)) {
    for (let it of Supplies) {
      if (it.id === Number(Id)) {
        it.quantity -= Number(amountSold);
        Log.addLog(Number(Id), Number(amountSold), true);
        return res.json(it);
      }
    }
  } else {
    return res.json({ error: true, msg: "we dont have enough items to sell." });
  }
};

export const gainSupplie = (req: Request, res: Response) => {
  const { Id, amountgained } = req.body;
  let obj = Supplies.find((it) => it.id === Number(Id));
  if (!obj) {
    return res.json({ error: true, msg: "no such id is found." });
  }

  for (let it of Supplies) {
    if (it.id === Number(Id)) {
      it.quantity += Number(amountgained);
      Log.addLog(Number(Id), Number(amountgained), false);
      return res.json(it);
    }
  }
};
