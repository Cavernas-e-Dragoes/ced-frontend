import { Equip } from "./equip";
import { EquipCategorias } from "./equip-categorias";

export interface EquipCategoriaResposta {
    index: string;
    name: string;
    equipment: Equip[];  // Agora é um array de Equip
    url: string;
  }