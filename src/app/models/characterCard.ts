export class characterCard {
    id!: number;
    name: string;
    raceName: string;
    className: string;
    level: number;
    
    constructor(id: number, name: string, raceName: string, className: string, level: number) {
      this.id = id;
      this.name = name;
      this.raceName = raceName;
      this.className = className;
      this.level =level;
    }
  }