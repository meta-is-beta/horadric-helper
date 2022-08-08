export type PoeConfig = {
  reference: String;
  data: PoeItem | PoePassive | String;
  iconUrl?: String;
  extensions?: PoeConfigExtensions;
};

export type PoeConfigExtensions = {
  socketReferences?: { [id: string]: string };
};

export type PoeItemRarity =
  | "normal"
  | "rare"
  | "magic"
  | "unique"
  | "gem"
  | "currency"
  | "divination card"
  | "";
export type PoeItemType =
  | "equipment"
  | "gem"
  | "jewel"
  | "flask"
  | "currency"
  | "map"
  | "divination card"
  | "";
export type PoeItemInfluence =
  | "crusader"
  | "warlord"
  | "hunter"
  | "redeemer"
  | "elder"
  | "shaper"
  | "replica"
  | "eater of worlds"
  | "searing exarch"
  | "";
export type PoeItemStatus = "corrupted" | "mirrored" | "split";
export type PoePassiveType =
  | "basic"
  | "notable"
  | "keystone"
  | "ascendancy basic"
  | "ascendancy notable"
  | "mastery"
  | "atlas basic"
  | "atlas notable"
  | "atlas keystone";

export type PoeItemSections = {
  itemLevel?: String;
  requirements?: String[];
  properties?: String[];
  enchants?: String[];
  scourgeMods?: String[];
  implicits?: String[];
  modifiers?: String[];
  gemDescription?: String[];
  divCardStacks?: String;
  divCardDescription?: String[];
  talismanTier?: String;
  statuses?: PoeItemStatus[];
  flavourText?: String[];
};

export type PoePassiveSections = {
  description: String[];
  flavourText?: String[];
};

export type PoeItem = {
  rarity?: PoeItemRarity;
  name: String;
  class?: String;
  type?: PoeItemType;
  baseName?: String;
  influences?: PoeItemInfluence[];
  sockets?: String;
  sections?: PoeItemSections;
  stacks?: Number | String;
};

export type PoePassive = {
  name: String;
  type: PoePassiveType;
  sections?: PoePassiveSections;
};

export type PoeItemDataSection = {
  name: String;
  lines: String[];
  index: number;
};

export type PoeShowcaseConfig = {
  reference: string;
  data: object;
  extensions?: object;
  iconUrl?: string;
};

export type PoeShowcase = {
  data: object;
  iconUrl?: string;
  extensions?: object;
  type: string;

  processStringData: (data: string) => object;
  processDataObject: (data: object) => object;
  applyConfigCallbacks: ((arg: PoeShowcase) => void)[];
};
