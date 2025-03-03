                                                                                                           export interface Character {
  id?: string;
  userId: string;
  name: string;
  level: number;
  experience: number;
  
  // Características básicas
  race: {
    index: string;
    name: string;
    url: string;
  };
  class: {
    index: string;
    name: string;
    url: string;
  };
  
  // Atributos
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  
  // Informações de campanha
  background: string;
  alignment: string;
  
  // Características derivadas
  hitPoints: {
    maximum: number;
    current: number;
    temporary: number;
  };
  
  armorClass: number;
  initiative: number;
  speed: number;
  
  // Proficiências
  proficiencies: {
    savingThrows: string[];
    skills: string[];
    languages: string[];
    tools: string[];
    weapons: string[];
    armors: string[];
  };
  
  // Equipamentos
  equipment: {
    id: string;
    name: string;
    quantity: number;
    equipped: boolean;
  }[];
  
  // Magias (se aplicável)
  spells?: {
    id: string;
    name: string;
    level: number;
    prepared: boolean;
  }[];
  
  // Outras informações
  features: {
    name: string;
    source: string;
    description: string;
  }[];
  
  // Para histórico de alterações
  createdAt: Date;
  updatedAt: Date;
}

export interface CharacterListItem {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
} 