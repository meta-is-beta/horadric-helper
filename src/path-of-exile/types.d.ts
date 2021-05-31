type PoeConfig = {
  reference: string;
  dataObject: PoeItem | PoePassive | null;
  rawData: string | null;
  iconSrc: string | null;
};

type PoeItem = {
  rarity: "normal" | "rare" | "magic" | "unique" | "gem" | "";
  class: String | undefined;
  type: "equipment" | "gem" | "jewel" | "flask" | "currency" | "map" | "";
  name: String | undefined;
  baseName: String | undefined;
  influences: (
    | "crusader"
    | "warlord"
    | "hunter"
    | "redeemer"
    | "elder"
    | "shaper"
    | "replica"
    | ""
  )[];
  level: String | undefined;
  requirements: String[] | undefined;
  sockets: String[] | undefined;
  properties: String[] | undefined;
  enchants: String[] | undefined;
  implicits: String[] | undefined;
  modifiers: String[] | undefined;
  gemDescription: String[] | undefined;
  statuses: ("corrupted" | "mirrored" | "split")[];
};

type PoeItemDataSection = {
  name: String;
  lines: String[];
  index: number;
};

type PoePassive = {
  name: String;
  type:
    | "basic"
    | "notable"
    | "keystone"
    | "ascendancy basic"
    | "ascendancy notable";
  description: String[];
};
