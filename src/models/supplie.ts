const MAX_SUPPLIE_CNT = 1e5;

export interface ourSupllies {
  name: string;
  id: number;
  tags: string[];
  quantity: number;
  refill_number_alert: number;
}

export let Supplies: ourSupllies[] = [];

function get_new_id(): number {
  while (true) {
    const randomNum = Math.floor(Math.random() * MAX_SUPPLIE_CNT) + 1;
    if (!Supplies.some((sup) => sup.id === randomNum)) {
      return randomNum;
    }
  }
}

export class Supplie {
  static getAllSupplies() {
    return Supplies;
  }

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
    if (Supplies.some((sup) => sup.name === name)) {
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
      refill_number_alert: this.refill_number_alert,
    };
  }

    static findById(id: number): ourSupllies | undefined {
    return Supplies.find((sup) => sup.id === id);
  }

  static addSupply(
    name: string,
    tags: string[],
    quantity: number,
    refill_number_alert: number
  ): ourSupllies | null {
    if (Supplies.some((sup) => sup.name === name)) {
      console.error(`Supply with name "${name}" already exists.`);
      return null;
    }
    try {
      const newSupplie = new Supplie(name, tags, quantity, refill_number_alert);
      return newSupplie.toOurSuppllies(); 
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

let addp1 = new Supplie("pen",["school" , "boys" , "girls"] , 100 , 15);
addp1 = new Supplie("book",["school"] , 50 , 25);
addp1 = new Supplie("book2",["school"] , 150 , 45);
addp1 = new Supplie("book3",["school"] , 550 , 255);
