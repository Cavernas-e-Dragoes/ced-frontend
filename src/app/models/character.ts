import { Equipment } from "./equipment";
import { Magic } from "./magic";

export class Character {
  id!: number;
  playerName: string;
  name: string;
  race: string;
  charClass: string;
  equipments: Equipment[];
  magics: Magic[];
  level: number;
  alignment: string;
  hitPoints: number;
  experiencePoints: number;
  iniciative: number;
  speed: number;
  armorClass: number;
  inspiration: number;
  passiveWisdom: number;

  nextLevel: number;

  //attributes
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  //modifiers
  strengthModifier!: number;
  dexterityModifier!: number;
  constitutionModifier!: number;
  intelligenceModifier!: number;
  wisdomModifier!: number;
  charismaModifier!: number;

  //saving throws
  STStrength!: boolean;
  STCharisma!: boolean;
  STDexterity!: boolean;
  STConstitution!: boolean;
  STIntelligence!: boolean;
  STWisdom!: boolean;

  //skills
  acrobatics!: boolean;
  animalHandling!: boolean;
  arcana!: boolean;
  athletics!: boolean;
  deception!: boolean;
  history!: boolean;
  insight!: boolean;
  intimidation!: boolean;
  investigation!: boolean;
  medicine!: boolean;
  nature!: boolean;
  perception!: boolean;
  performance!: boolean;
  persuasion!: boolean;
  religion!: boolean;
  sleightOfHand!: boolean;
  stealth!: boolean;
  survival!: boolean;

  constructor(
    id: number,
    playerName: string,
    name: string,
    race: string,
    charClass: string,
    level: number,
    alignment: string,
    hitPoints: number,
    experiencePoints: number,
    iniciative: number,
    speed: number,
    armorClass: number,
    inspiration: number,
    passiveWisdom: number,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    nextLevel: number,
  ) {
    this.id = id;
    this.playerName = playerName;
    this.name = name;
    this.race = race;
    this.charClass = charClass;
    this.level = level;
    this.nextLevel = nextLevel;
    this.alignment = alignment;
    this.hitPoints = hitPoints;
    this.experiencePoints = experiencePoints;
    this.iniciative = iniciative;
    this.speed = speed;
    this.armorClass = armorClass;
    this.inspiration = inspiration;
    this.passiveWisdom = passiveWisdom;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.equipments = [];
    this.magics = [];
    // Inicialize os modifiers, saving throws e skills
    this.calculateModifiers();
    this.calculateSavingThrows();
    this.initializeSkills();
  }

  private calculateModifiers() {
    this.strengthModifier = Math.floor((this.strength - 10) / 2);
    this.dexterityModifier = Math.floor((this.dexterity - 10) / 2);
    this.constitutionModifier = Math.floor((this.constitution - 10) / 2);
    this.intelligenceModifier = Math.floor((this.intelligence - 10) / 2);
    this.wisdomModifier = Math.floor((this.wisdom - 10) / 2);
    this.charismaModifier = Math.floor((this.charisma - 10) / 2);
  }

  private calculateSavingThrows() {
    this.STStrength = this.charClass === "Fighter" || this.charClass === "Barbarian";
    this.STCharisma = this.charClass === "Bard" || this.charClass === "Sorcerer";
    this.STDexterity = this.charClass === "Rogue" || this.charClass === "Ranger";
    this.STConstitution = this.charClass === "Cleric" || this.charClass === "Wizard";
    this.STIntelligence = this.charClass === "Wizard" || this.charClass === "Artificer";
    this.STWisdom = this.charClass === "Cleric" || this.charClass === "Druid";
  }

  private initializeSkills() {
    this.acrobatics = this.charClass === "Rogue" || this.charClass === "Bard";
    this.animalHandling = this.charClass === "Druid" || this.charClass === "Ranger";
    this.arcana = this.charClass === "Wizard" || this.charClass === "Warlock";
    this.athletics = this.charClass === "Barbarian" || this.charClass === "Fighter";
    this.deception = this.charClass === "Rogue" || this.charClass === "Bard";
    this.history = this.charClass === "Wizard" || this.charClass === "Bard";
    this.insight = this.charClass === "Cleric" || this.charClass === "Paladin";
    this.intimidation = this.charClass === "Barbarian" || this.charClass === "Fighter";
    this.investigation = this.charClass === "Wizard" || this.charClass === "Rogue";
    this.medicine = this.charClass === "Cleric" || this.charClass === "Druid";
    this.nature = this.charClass === "Ranger" || this.charClass === "Druid";
    this.perception = this.charClass === "Ranger" || this.charClass === "Rogue";
    this.performance = this.charClass === "Bard";
    this.persuasion = this.charClass === "Bard" || this.charClass === "Paladin";
    this.religion = this.charClass === "Cleric" || this.charClass === "Paladin";
    this.sleightOfHand = this.charClass === "Rogue";
    this.stealth = this.charClass === "Rogue" || this.charClass === "Ranger";
    this.survival = this.charClass === "Ranger" || this.charClass === "Druid";
  }
}
