type PoeShowcaseConfig = {
  dataObject: PoeItem | PoeNode | null;
  rawData: string | null;
  iconSrc: URL;
};

type PoeItem = {
  rarity: "normal" | "rare" | "magic" | "unique" | "gem";
  class: String;
  type: String;
  name: String;
  baseName: String;
  influences: (
    | "crusader"
    | "warlord"
    | "hunter"
    | "redeemer"
    | "elder"
    | "shaper"
    | "replica"
  )[];
  level: String;
  requirements: String[];
  sockets: String[];
  properties: String[];
  enchants: String[];
  implicits: String[];
  modifiers: String[];
  gemDescription: String[];
  statuses: ("corrupted" | "mirrored" | "split")[];
};

type PoeItemDataSection = {
  name: String;
  lines: String[];
  index: number;
};

type PoeNode = {
  name: String;
  type: "basic" | "notable" | "keystone";
  description: String[];
};
