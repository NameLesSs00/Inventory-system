interface InventoryLog {
  logId: number;
  itemId: number; 
  amount: number; // amount of items added (gain) or sold (loss)
  sell: boolean; // true = sold (items lost), false = gained (items added)
  date: string;
}

export let Logs: InventoryLog[] = [];

export class Log {
  private logId: number;
  private itemId: number;
  private amount: number;
  private sell: boolean;
  private date: string;

  constructor(itemId: number, amount: number, sell: boolean) {
    this.logId = Logs.length + 1;
    this.itemId = itemId;
    this.amount = amount;
    this.sell = sell;
    this.date = new Date().toISOString();

    Logs.push(this.toInventoryLog());
  }

  private toInventoryLog(): InventoryLog {
    return {
      logId: this.logId,
      itemId: this.itemId,
      amount: this.amount,
      sell: this.sell,
      date: this.date,
    };
  }

  static addLog(itemId: number, amount: number, sell: boolean): void {
    new Log(itemId, amount, sell);
  }

  static findById(logId: number): InventoryLog | undefined {
    return Logs.find((log) => log.logId === logId);
  }

  static getAllLogs(): InventoryLog[] {
    return Logs;
  }
}
