type PoeConfig = {
  reference: string;
  dataObject: PoeItem | PoePassive | null;
  rawData: string | null;
  iconUrl: string | null;
};

type PoeItem = {
  rarity: "normal" | "rare" | "magic" | "unique" | "gem" | "";
  class: String | undefined;
  type: "Equipment" | "Gem" | "Jewel" | "Flask" | "Currency" | "Map" | "";
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
  sockets: String[] | undefined;
  sections: {
    itemLevel: String | undefined;
    requirements: String[] | undefined;
    properties: String[] | undefined;
    enchants: String[] | undefined;
    implicits: String[] | undefined;
    modifiers: String[] | undefined;
    gemDescription: String[] | undefined;
    statuses: ("corrupted" | "mirrored" | "split")[];
  };
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
