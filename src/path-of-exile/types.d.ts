type PoeShowcaseConfig = {
  dataObject: PoeItem | PoeNode | null;
  rawData: string | null;
  iconSrc: URL;
};

type PoeItem = {
  rarity: "normal" | "rare" | "magic" | "unique" | "gem" | "";
  class: String | undefined;
  type: String | undefined;
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

type PoeNode = {
  name: String;
  type: "basic" | "notable" | "keystone";
  description: String[];
};

enum PoeObjectType {
  Item = "item",
  Node = "node",
}
