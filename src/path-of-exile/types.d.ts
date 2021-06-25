type PoeConfig = {
  reference: string;
  data: PoeItem | PoePassive | string;
  iconUrl?: string;
};

type PoeItemRarity =
  | "normal"
  | "rare"
  | "magic"
  | "unique"
  | "gem"
  | "currency"
  | "";
type PoeItemType =
  | "equipment"
  | "gem"
  | "jewel"
  | "flask"
  | "currency"
  | "map"
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
  itemLevel?: String;
  requirements?: String[];
  properties?: String[];
  enchants?: String[];
  implicits?: String[];
  modifiers?: String[];
  gemDescription?: String[];
  talismanTier?: String;
  statuses?: PoeItemStatus[];
};

type PoePassiveSections = {
  description: String[];
};

type PoeItem = {
  rarity: PoeItemRarity;
  name: String;
  class?: String;
  type?: PoeItemType;
  baseName?: String;
  influences?: PoeItemInfluence[];
  sockets?: String;
  sections?: PoeItemSections;
  stacks?: Number;
};

type PoePassive = {
  name: String;
  type: PoePassiveType;
  sections?: PoePassiveSections;
};

type PoeItemDataSection = {
  name: String;
  lines: String[];
  index: number;
};

type PoeShowcaseConfig = {
  reference: string;
  data: object;
  extensions?: object;
  iconUrl?: string;
};

type PoeShowcase = {
  data: object;
  iconUrl?: string;
  extensions?: object;
  type: string;

  processStringData: (data: string) => object;
  processDataObject: (data: object) => object;
  applyConfigCallbacks: ((arg: PoeShowcase) => void)[];
};
