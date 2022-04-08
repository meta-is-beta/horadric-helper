export interface PoeItemData {
  verified: boolean;
  w: number;
  h: number;
  icon: String;
  league: String;
  id: String;
  name: String;
  typeLine: String;
  baseType: String;
  identified: boolean;
  sockets: PoeItemDataSocket[];
  ilvl: number;
  influences: object;
  properties: PoeItemDataProperty[];
  requirements: PoeItemDataRequirements[];
  scourgeMods: String[];
  enchantMods: String[];
  utilityMods: String[];
  implicitMods: String[];
  explicitMods: String[];
  craftedMods: String[];
  socketedItems: PoeItemData[];
  flavourText: String[];
  frameType: number;
  x: number;
  y: number;
  inventoryId: String;
  descrText: String;
  secDescrText: String;
  corrupted: boolean;
  mirrored: boolean;
  replica: boolean;
  split: boolean;
  talismanTier: number;
  socket: number;
}

export interface PoeItemDataProperty {
  name: String;
  values: (String | number)[][];
  displayMode: number;
  type: number;
}

export interface PoeItemDataRequirements {
  name: String;
  values: (String | number)[][];
  displayMode: number;
  suffix: String;
}

export interface PoeItemDataSocket {
  group: number;
  attr: String;
  sColour: String;
}
