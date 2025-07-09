const MAX_SUPPLIE_CNT = 1e5;

interface ourSupllies {
  name: string;
  id: number;
  tags: string[]; 
  quantity: number;
  refill_number_alert: number;
}

let Supplies: ourSupllies[] = [];

function get_new_id(): number {
  while (true) {
    const randomNum = Math.floor(Math.random() * MAX_SUPPLIE_CNT) + 1;
    if (!Supplies.some(sup => sup.id === randomNum)) {
      return randomNum;
    }
  }
}

class Supplie {
  private name: string;
  private id: number;
  private tags: string[];
  private quantity: number;
  private refill_number_alert: number;

  constructor(
    name: string,
    tags: string[],
    quantity: number,
    refill_number_alert: number
  ) {
    // Check unique name
    if (Supplies.some(sup => sup.name === name)) {
      throw new Error(`A supply with the name "${name}" already exists.`);
    }

    this.id = get_new_id();
    this.name = name;
    this.quantity = quantity;
    this.refill_number_alert = refill_number_alert;
    this.tags = tags;

    Supplies.push(this.toOurSuppllies());
  }

  toOurSuppllies(): ourSupllies {
    return {
      id: this.id,
      name: this.name,
      tags: this.tags,
      quantity: this.quantity,
      refill_number_alert: this.refill_number_alert
    };
  }

  static findById(id: number): ourSupllies | undefined {
    return Supplies.find(sup => sup.id === id);
  }

  static addSupply(
    name: string,
    tags: string[],
    quantity: number,
    refill_number_alert: number
  ): boolean {
    if (Supplies.some(sup => sup.name === name)) {
      console.error(`Supply with name "${name}" already exists.`);
      return false;
    }
    try {
      new Supplie(name, tags, quantity, refill_number_alert);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

Supplie.addSupply("Pen", ["stationery"], 100, 10);
Supplie.addSupply("Notebook", ["stationery"], 200, 20);
Supplie.addSupply("Stapler", ["office"], 50, 5);
Supplie.addSupply("Marker", ["whiteboard"], 80, 8);