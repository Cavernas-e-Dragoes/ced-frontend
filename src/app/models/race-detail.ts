export interface RaceDetail {
    id: string;
    index: string;
    name: string;
    speed: number;
    abilityBonuses: AbilityBonus[];
    alignment: string;
    age: string;
    size: string;
    sizeDescription: string;
    startingProficiencies: Proficiency[];
    startingProficiencyOptions: StartingProficiencyOption;
    languages: Language[];
    languageDesc: string;
    traits: Trait[];
    subraces: Subrace[];
    url: string;
  }
  
  export interface AbilityBonus {
    abilityScore: AbilityScore | null;
    bonus: number;
  }
  
  export interface AbilityScore {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Proficiency {
    index: string;
    name: string;
    url: string;
  }
  
  export interface StartingProficiencyOption {
    desc: string;
    choose: number;
    type: string;
    from: From;
  }
  
  export interface From {
    option_set_type: string;
    options: Option[];
  }
  
  export interface Option {
    optionType: string | null;
    count: number | null;
    item: Proficiency | null;
    choice: Choice | null;
    of: any;
  }
  
  export interface Choice {
    desc: string;
    choose: number;
    type: string;
    from: From;
  }
  
  export interface Language {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Trait {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Subrace {
    index: string;
    name: string;
    url: string;
  }