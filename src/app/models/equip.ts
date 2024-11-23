export interface Equip {
    index: string;
    name: string;
    equipmentCategory: {
      index: string;
      name: string;
      url: string;
    };
    gearCategory: string | null;
    cost: {
      quantity: number;
      unit: string;
    };
    weight: number;
    desc: string | null;
    url: string;
  }