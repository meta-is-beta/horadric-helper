import "./../types";
import extractSections from "./sections-extractor";

export default (rawData: String): PoeItem => {
  const sections: PoeItemDataSection[] = extractSections(rawData);
  const headerSection = getHeaderSection(sections);
  const itemClass = getItemClass(headerSection);

  return {
    class: itemClass,
    rarity: getItemRarity(headerSection),
    type: getItemType(itemClass),
    name: getItemName(headerSection),
    baseName: getItemBaseName(headerSection),
    influences: getItemInfluences(sections),
    level: getItemLevel(sections),
    requirements: getRequirements(sections),
    sockets: getSockets(sections),
    properties: getProperties(sections),
    enchants: getEnchants(sections),
    implicits: getImplicits(sections),
    modifiers: getModifiers(sections),
    gemDescription: getGemDescription(sections),
    statuses: getItemStatuses(sections),
  };
};

const getHeaderSection = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Header");

const getItemClass = (headerSection: PoeItemDataSection) =>
  headerSection.lines[0].match(/Item Class:([A-z ]+)/)[1].trim();

const getItemRarity = (headerSection: PoeItemDataSection) =>
  headerSection.lines[1].match(/Rarity:([A-z ]+)/)[1].trim() as
    | "normal"
    | "rare"
    | "magic"
    | "unique"
    | "gem";

const getItemName = (headerSection: PoeItemDataSection) =>
  headerSection.lines[2].trim();

const getItemType = (itemClass: String) => {
  if (itemClass.includes("Jewel")) return "Jewel";
  if (itemClass.includes("Flask")) return "Flask";
  if (itemClass.includes("Gem")) return "Gem";
  if (itemClass.includes("Currency")) return "Currency";

  return "Equipment";
};

const getItemBaseName = (headerSection: PoeItemDataSection) =>
  headerSection.lines[headerSection.lines.length - 1].trim();

const getItemInfluences = (sections: PoeItemDataSection[]) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  if (!influencesSection) {
    return [];
  }

  return influencesSection.lines.map((line) =>
    line
      .match(/([A-Z][a-z]+) Item$/)[1]
      .toLowerCase()
      .trim()
  ) as (
    | "crusader"
    | "warlord"
    | "hunter"
    | "redeemer"
    | "elder"
    | "shaper"
    | "replica"
  )[];
};

const getItemLevel = (sections: PoeItemDataSection[]) => {
  const itemLevelSection = sections.find((x) => x.name === "Item level");
  if (!itemLevelSection || itemLevelSection.lines.length < 1) {
    return "";
  }

  return itemLevelSection.lines[0].match(/Item Level: ([0-9]+)/)[1].trim();
};

const getItemStatuses = (sections: PoeItemDataSection[]) => {
  const itemStatuses: String[] = [];

  if (sections.some((x) => x.name === "Corrupted status")) {
    itemStatuses.push("corrupted");
  }
  if (sections.some((x) => x.name === "Mirrored status")) {
    itemStatuses.push("mirrored");
  }
  if (sections.some((x) => x.name === "Split status")) {
    itemStatuses.push("split");
  }

  return itemStatuses as ("corrupted" | "mirrored" | "split")[];
};

const getRequirements = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Requirements").lines;
const getEnchants = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Enchants").lines;
const getImplicits = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Implicits").lines;
const getSockets = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Sockets").lines;
const getProperties = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Properties").lines;
const getModifiers = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Modifiers").lines;
const getGemDescription = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Gem description").lines;
