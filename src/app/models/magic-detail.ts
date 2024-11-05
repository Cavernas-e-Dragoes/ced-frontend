export interface MagicDetail {
    id: string;
    index: string;
    name: string;
    desc: string[];
    higherLevel: string[];
    range: string;
    components: string[];
    material: string;
    ritual: boolean;
    duration: string;
    concentration: boolean;
    castingTime: string;
    level: number;
    attackType: string | null;
    damage: string | null;
    areaOfEffect: AreaOfEffect;
    dc: DC;
    school: School;
    classes: MagicClass[];
    subclasses: any[]; // Se necessário, ajuste para incluir subclasses específicas
    url: string;
}

export interface AreaOfEffect {
    type: string;
    size: number;
    height?: number | null;
    depth?: number | null;
    width?: number | null;
}

export interface DC {
    dcType: DCType;
    dcSuccess: string;
}

export interface DCType {
    index: string;
    name: string;
    url: string;
}

export interface School {
    index: string;
    name: string;
    url: string;
}

export interface MagicClass {
    index: string;
    name: string;
    url: string;
}