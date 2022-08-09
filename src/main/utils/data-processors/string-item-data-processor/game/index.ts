import {
  PoeItem,
  PoeItemDataSection,
  PoeItemInfluence,
  PoeItemType,
} from "@/types";
import { mapSections, remapSiegeOfTheAtlasInfluences } from "./sections-mapper";

export default (rawData: String): PoeItem => {
  let sections = mapSections(rawData);
  sections = remapSiegeOfTheAtlasInfluences(sections);
  const headerSection = getHeaderSection(sections);
  const itemClass = getItemClass(headerSection);
  const itemType = getItemType(itemClass);
  const name = getItemName(headerSection);
  const rarity = getItemRarity(headerSection);

  if (itemType === "divination card") {
    const divCardStacks = getDivinationCardStacks(sections);
    const divCardItem: PoeItem = {
      name,
      type: itemType,
      class: itemClass,
      baseName: rarity,
      stacks: extractDivCardsStacks(divCardStacks),
      sections: {
        divCardDescription: getDivinationCardDescription(sections),
        flavourText: getFlavorText(sections),
      },
    };

    return divCardItem;
  }

  const properties = getProperties(sections);

  return {
    class: itemClass,
    rarity,
    type: itemType,
    name,
    baseName: getItemBaseName(headerSection),
    influences: getItemInfluences(sections, name),
    sockets: getSockets(sections),
    stacks: getStacks(properties),
    sections: {
      itemLevel: getItemLevel(sections),
      talismanTier: getTalismanTier(sections),
      requirements: getRequirements(sections),
      properties,
      scourgeMods: getScourgeMods(sections),
      enchants: getEnchants(sections),
      implicits: getImplicits(sections),
      modifiers: getModifiers(sections),
      flavourText: getFlavorText(sections),
      gemDescription: getGemDescription(sections),
      statuses: getItemStatuses(sections),
    },
  };
};

const getHeaderSection = (sections: PoeItemDataSection[]): PoeItemDataSection =>
  sections.find((x) => x.name === "Header") as PoeItemDataSection;

const getItemClass = (headerSection: PoeItemDataSection) => {
  const classMatch = headerSection.lines[0].match(/^Item Class: ([A-z ]+)$/);
  if (classMatch && classMatch.length > 0) {
    return classMatch[1].trim();
  }

  return "";
};
const getItemRarity = (headerSection: PoeItemDataSection) => {
  const rarityMatch = headerSection.lines[1].match(/^Rarity: ([A-z ]+)$/);

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

const getItemType = (itemClass: String): PoeItemType => {
  if (itemClass.includes("Jewel")) return "jewel";
  if (itemClass.includes("Flask")) return "flask";
  if (itemClass.includes("Gem")) return "gem";
  if (itemClass.includes("Currency")) return "currency";
  if (itemClass.includes("Maps")) return "map";
  if (itemClass.includes("Divination")) return "divination card";

  return "equipment";
};

const getItemBaseName = (headerSection: PoeItemDataSection) =>
  headerSection.lines[headerSection.lines.length - 1].trim();

const getItemInfluences = (sections: PoeItemDataSection[], name: string) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  let influences: PoeItemInfluence[] = [];

  if (name && name.startsWith("Replica ")) {
    influences.push("replica");
  }

  if (influencesSection) {
    influences = influences.concat(
      influencesSection.lines.map((line) => {
        const lineMatch = line.match(/^([A-z ]+) Item$/);

        if (lineMatch && lineMatch.length > 0) {
          const influence = lineMatch[1];

          return influence.toLowerCase().trim() as
            | "crusader"
            | "warlord"
            | "hunter"
            | "redeemer"
            | "elder"
            | "shaper"
            | "replica"
            | "eater of worlds"
            | "searing exarch";
        }
        return "";
      })
    );
  }

  return influences;
};

const getItemLevel = (sections: PoeItemDataSection[]) => {
  const itemLevelSection = sections.find((x) => x.name === "Item level");

  if (!itemLevelSection || itemLevelSection.lines.length < 1) {
    return "";
  }

  const itemLevelMatch = itemLevelSection.lines[0].match(
    /^Item Level: ([0-9]+)$/
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
    /^Talisman Tier: ([0-9]+)$/
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
    ?.lines.filter((l) => l !== "Requirements:");

const getScourgeMods = (sections: PoeItemDataSection[]) =>
  sections
    .find((x) => x.name === "Scourge")
    ?.lines.map((l) => l.replace(/\(scourge\)/g, "").trim());

const getEnchants = (sections: PoeItemDataSection[]) =>
  sections
    .find((x) => x.name === "Enchants")
    ?.lines.map((l) => l.replace(/\(enchant\)/g, "").trim());

const getImplicits = (sections: PoeItemDataSection[]) =>
  sections
    .find((x) => x.name === "Implicits")
    ?.lines.map((l) => l.replace(/\(implicit\)/g, "").trim());

const getSockets = (sections: PoeItemDataSection[]) => {
  const socketLine = sections.find((x) => x.name === "Sockets")?.lines[0];
  if (!socketLine) {
    return undefined;
  }

  const socketsMatch = socketLine?.match(/^Sockets: ([A-Z- ]+)$/);
  if (!socketsMatch) {
    return undefined;
  }

  return socketsMatch[1];
};

const getProperties = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Properties")?.lines;
const getModifiers = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Modifiers")?.lines;
const getGemDescription = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Gem description")?.lines;
const getStacks = (
  itemProperties: String[] | undefined
): Number | undefined => {
  if (!itemProperties) {
    return undefined;
  }
  const itemStacksLine = itemProperties.find((prop) =>
    prop.startsWith("Stack ")
  );

  if (!itemStacksLine) {
    return undefined;
  }

  const itemStacksMatch = itemStacksLine.match(/: ([0-9]+)/);
  if (!itemStacksMatch) {
    return undefined;
  }

  return parseInt(itemStacksMatch[1]);
};

const getFlavorText = (sections: PoeItemDataSection[]) => {
  const flavourText = sections.find((x) => x.name === "Flavour text")?.lines;

  if (!flavourText || flavourText.length === 0) {
    return [];
  }

  flavourText[0] = flavourText[0].replace(/Flavour text:/i, "");

  return flavourText;
};

const getDivinationCardStacks = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Div card stacks")?.lines;

const getDivinationCardDescription = (sections: PoeItemDataSection[]) =>
  sections.find((x) => x.name === "Div card description")?.lines;

const extractDivCardsStacks = (
  divCardStacks?: String[]
): string | undefined => {
  if (!divCardStacks) return undefined;

  const itemStacksMatch = divCardStacks[0].match(/([0-9]+\/[0-9]+)/);
  if (!itemStacksMatch) {
    return undefined;
  }

  return itemStacksMatch[1];
};
