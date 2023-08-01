export class Class {
    name: string;
    description: string;
    hitDice: number;
    primaryAbility: string;
    savingProficiencies: string;
    armorWeaponProficiencies: string;

    constructor(
        name: string, 
        description: string, 
        hitDice: number, 
        primaryAbility: string, 
        savingProficiencies: string, 
        armorWeaponProficiencies: string
        ) {
        this.name = name;
        this.description = description;
        this.hitDice = hitDice;
        this.primaryAbility = primaryAbility;
        this.savingProficiencies = savingProficiencies;
        this.armorWeaponProficiencies = armorWeaponProficiencies;
    }
  }