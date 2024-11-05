export interface ClassDetail {
    id: string;
    index: string;
    name: string;
    hitDie: number;
    proficiencyChoices: ProficiencyChoice[];
    proficiencies: Proficiency[];
    savingThrows: SavingThrow[];
    startingEquipment: StartingEquipment[];
    startingEquipmentOptions: StartingEquipmentOption[];
    classLevels: string;
    multiClassing: MultiClassing;
    subclasses: Subclass[];
    spellcasting: Spellcasting;
    url: string;
  }
  
  export interface ProficiencyChoice {
    desc: string;
    choose: number;
    type: string;
    from: From;
  }
  
  export interface From {
    optionSetType: string;
    options: Option[];
    equipmentCategory: any;
  }
  
  export interface Option {
    optionType: string | null;
    count: number | null;
    item: ProficiencyItem | null;
    choice: Choice | null;
    of: Equipment | null;
  }
  
  export interface ProficiencyItem {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Choice {
    desc: string;
    choose: number;
    type: string;
    from: From;
  }
  
  export interface Equipment {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Proficiency {
    index: string;
    name: string;
    url: string;
  }
  
  export interface SavingThrow {
    index: string;
    name: string;
    url: string;
  }
  
  export interface StartingEquipment {
    equipment: Equipment;
    quantity: number;
  }
  
  export interface StartingEquipmentOption {
    desc: string;
    choose: number;
    type: string;
    from: From;
  }
  
  export interface MultiClassing {
    prerequisites: Prerequisite[];
    proficiencyChoices: any;
    proficiencies: Proficiency[];
  }
  
  export interface Prerequisite {
    abilityScore: AbilityScore;
    minimumScore: number;
  }
  
  export interface AbilityScore {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Subclass {
    index: string;
    name: string;
    url: string;
  }
  
  export interface Spellcasting {
    spellcasting_ability: any;
  }