import mapSections from "./sections-mapper";

export default (rawData: String): PoeItem => {
  const sections = mapSections(rawData);
  const headerSection = getHeaderSection(sections);
  const itemClass = getItemClass(headerSection);

  return {
    class: itemClass,
    rarity: getItemRarity(headerSection),
    type: getItemType(itemClass),
    name: getItemName(headerSection),
    baseName: getItemBaseName(headerSection),
    influences: getItemInfluences(sections),
    sockets: getSockets(sections),
    sections: {
      itemLevel: getItemLevel(sections),
      talismanTier: getTalismanTier(sections),
      requirements: getRequirements(sections),
      properties: getProperties(sections),
      enchants: getEnchants(sections),
      implicits: getImplicits(sections),
      modifiers: getModifiers(sections),
      gemDescription: getGemDescription(sections),
      statuses: getItemStatuses(sections),
    },
  };
};

const getHeaderSection = (sections: PoeItemDataSection[]): PoeItemDataSection =>
  sections.find((x) => x.name === "Header") as PoeItemDataSection;

const getItemClass = (headerSection: PoeItemDataSection) => {
  const classMatch = headerSection.lines[0].match(/Item Class:([A-z ]+)/);
  if (classMatch && classMatch.length > 0) {
    return classMatch[1].trim();
  }

  return "";
};
const getItemRarity = (headerSection: PoeItemDataSection) => {
  const rarityMatch = headerSection.lines[1].match(/Rarity:([A-z ]+)/);

  if (rarityMatch && rarityMatch.length > 0) {
    return rarityMatch[1].trim() as
      | "normal"
      | "rare"
      | "magic"
      | "unique"
      | "gem";
  }

  return "";
};

const getItemName = (headerSection: PoeItemDataSection) =>
  headerSection.lines[2].trim();

const getItemType = (itemClass: String) => {
  if (itemClass.includes("Jewel")) return "Jewel";
  if (itemClass.includes("Flask")) return "Flask";
  if (itemClass.includes("Gem")) return "Gem";
  if (itemClass.includes("Currency")) return "Currency";
  if (itemClass.includes("Maps")) return "Map";

  return "Equipment";
};

const getItemBaseName = (headerSection: PoeItemDataSection) =>
  headerSection.lines[headerSection.lines.length - 1].trim();

const getItemInfluences = (sections: PoeItemDataSection[]) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  if (!influencesSection) {
    return [];
  }

  return influencesSection.lines.map((line) => {
    const lineMatch = line.match(/([A-Z][a-z]+) Item$/);

    if (lineMatch && lineMatch.length > 0) {
      return lineMatch[1].toLowerCase().trim() as
        | "crusader"
        | "warlord"
        | "hunter"
        | "redeemer"
        | "elder"
        | "shaper"
        | "replica";
    }
    return "";
  });
};

const getItemLevel = (sections: PoeItemDataSection[]) => {
  const itemLevelSection = sections.find((x) => x.name === "Item level");

  if (!itemLevelSection || itemLevelSection.lines.length < 1) {
    return "";
  }

  const itemLevelMatch = itemLevelSection.lines[0].match(
    /Item Level: ([0-9]+)/
  );

  if (itemLevelMatch && itemLevelMatch.length > 0) {
    return itemLevelMatch[1].trim();
  }

  return "";
};

const getTalismanTier = (sections: PoeItemDataSection[]) => {
  const talismanTierSection = sections.find((x) => x.name === "Talisman tier");

  if (!talismanTierSection || talismanTierSection.lines.length < 1) {
    return "";
  }

  const talismanTierMatch = talismanTierSection.lines[0].match(
    /Talisman Tier: ([0-9]+)/
  );

  if (talismanTierMatch && talismanTierMatch.length > 0) {
    return talismanTierMatch[1].trim();
  }

  return "";
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
  sections
    .find((x) => x.name === "Requirements")
    ?.lines.filter((x) => x !== "Requirements:");
const getEnchants = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Enchants")?.lines;
const getImplicits = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Implicits")?.lines;
const getSockets = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Sockets")?.lines;
const getProperties = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Properties")?.lines;
const getModifiers = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Modifiers")?.lines;
const getGemDescription = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Gem description")?.lines;