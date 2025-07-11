import { Request, Response } from "express";
import { Log, Logs } from "../models/log";
import { ourSupllies, Supplie } from "../models/supplie";

export function getAllLogs(req: Request, res: Response) {
  const logs = Log.getAllLogs();
  res.json(logs);
}

//to do later 
// fix this funtion so it can take params and insted of making a report for a day we want it to work for a mount and for a year without copy past the code  
export const getReportDay = (req: Request, res: Response) => {
  interface mapObj {
    added?: number;
    removed?: number;
  }

  const SuppliesMap = new Map<number, mapObj>();
  const dateFilter1 = new Date();
  const dateFilter2 = new Date();
  dateFilter1.setHours(0, 0, 0, 0);
  dateFilter2.setHours(0, 0, 0, 0);
  dateFilter2.setDate(dateFilter2.getDate() + 1);

  // that should let us get just the day and mount and year without taking care of times itself so that we can get the report of the whole day this day not just before 24 hours there is a difference

  for (let it of Logs) {
    let workingDate = new Date(it.date);
    if (dateFilter2 >= workingDate && workingDate >= dateFilter1) {
      if (SuppliesMap.has(it.itemId)) {
        let obj = SuppliesMap.get(it.itemId);
        //item already exists
        let ad = obj?.added ?? 0;
        let rem = obj?.removed ?? 0;
        if (it.sell) {
          SuppliesMap.set(it.itemId, {
            added: 0 + ad,
            removed: it.amount + rem,
          });
        } else {
          SuppliesMap.set(it.itemId, { added: it.amount, removed: 0 });
        }
      } else {
        //first time added / removed
        if (it.sell) {
          SuppliesMap.set(it.itemId, { added: 0, removed: it.amount });
        } else {
          SuppliesMap.set(it.itemId, { added: it.amount, removed: 0 });
        }
      }
    }
  }

  // also we could say output
  interface arrItem {
    dateStart: string;
    dataEnd: string;
    itemId: number;
    itemName: string;
    sold: number;
    gained: number;
    remaning: number;
    IsLow: boolean;
  }

  let report: arrItem[] = [];

  for (let [key, obj] of SuppliesMap) {
    let start = dateFilter1.toString();
    let end = dateFilter2.toString();
    let myObj: ourSupllies | undefined = Supplie.findById(key);
    let name = myObj?.name ?? "";
    let soldd: number = obj?.removed ?? 0;
    let gain: number = obj?.added ?? 0;
    let rem = myObj?.quantity ?? 0 + gain - soldd;
    let isLow = (myObj?.refill_number_alert ?? 0) > rem ? true : false;

    report.push({
      dateStart: start,
      dataEnd: end,
      itemId: key,
      itemName: name,
      sold: soldd,
      gained: gain,
      remaning: rem,
      IsLow: isLow,
    });
  }
  res.send(report);
};

//{start,end,key,name,soldd,gain,rem,isLow}
// now we need to make the report
// this gonna be an array of items
/*{
  date start #### to ####
  item id and item name 
  sold items 
  gained items 
  remaning

  altert triggerd (if the refill_number_alert is is reached we gonna set this to true)

  } */
/*
format {
item id : id
plus or mins = totoal items that have been sold or buy

}
*/
