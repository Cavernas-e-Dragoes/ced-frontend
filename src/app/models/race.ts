import { SubRace } from "./subRace";

export class Race {
    name: string;
    abilityScoreIncrease: string;
    subRaces: SubRace[];
    
    constructor(name: string, abilityScoreIncrease: string, subRaces:SubRace[] ) {
        this.name = name;
        this.abilityScoreIncrease = abilityScoreIncrease;
        this.subRaces = subRaces;
    }
  }