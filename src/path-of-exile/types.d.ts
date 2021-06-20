type PoeConfig = {
  reference: string;
  dataObject: PoeItem | PoePassive | null;
  rawData: string | null;
  iconUrl: string | null;
};

type PoeItemRarity = "normal" | "rare" | "magic" | "unique" | "gem" | "";
type PoeItemType =
  | "Equipment"
  | "Gem"
  | "Jewel"
  | "Flask"
  | "Currency"
  | "Map"
  | "";
type PoeItemInfluence =
  | "crusader"
  | "warlord"
  | "hunter"
  | "redeemer"
  | "elder"
  | "shaper"
  | "replica"
  | "";
type PoeItemStatus = "corrupted" | "mirrored" | "split";
type PoePassiveType =
  | "basic"
  | "notable"
  | "keystone"
  | "ascendancy basic"
  | "ascendancy notable";

type PoeItemSections = {
  itemLevel: String | undefined;
  requirements: String[] | undefined;
  properties: String[] | undefined;
  enchants: String[] | undefined;
  implicits: String[] | undefined;
  modifiers: String[] | undefined;
  gemDescription: String[] | undefined;
  statuses: PoeItemStatus[];
};

type PoePassiveSections = {
  description: String[];
};

type PoeItem = {
  rarity: PoeItemRarity;
  class: String | undefined;
  type: PoeItemType;
  name: String | undefined;
  baseName: String | undefined;
  influences: PoeItemInfluence[];
  sockets: String[] | undefined;
  sections: PoeItemSections | {};
};

type PoePassive = {
  name: String;
  type: PoePassiveType;
  sections: PoePassiveSections | {};
};

type PoeItemDataSection = {
  name: String;
  lines: String[];
  index: number;
};
