import processItemDescription from "@/shared/data-processors/core-item-processor";
import { removeUnknownSections } from "@/shared/data-processors/processor-helper-functions";

export default (rawDescription) => {
  const itemData = processItemDescription(rawDescription);
  const itemType = getItemType(itemData.sections);

  itemData.sections = fillUnknownSections(itemData.sections, itemType);
  itemData.sections = removeUnknownSections(itemData.sections);

  const itemLevel = getItemLevel(itemData.sections);
  const itemInfluences = getItemInfluences(itemData.sections);
  const itemRequirements = itemData.sections.find(
    (x) => x.name === "Requirements"
  );
  const itemEnchants = itemData.sections.find((x) => x.name === "Enchants");
  const itemImplicits = itemData.sections.find((x) => x.name === "Implicits");
  const itemSockets = itemData.sections.find((x) => x.name === "Sockets");
  const itemProperties = itemData.sections.find((x) => x.name === "Properties");
  const itemModifiers = itemData.sections.find((x) => x.name === "Modifiers");
  const itemGemDescription = itemData.sections.find(
    (x) => x.name === "Gem description"
  );

  const itemStatuses = [];

  if (itemData.sections.some((x) => x.name === "Corrupted status")) {
    itemStatuses.push("corrupted");
  }
  if (itemData.sections.some((x) => x.name === "Mirrored status")) {
    itemStatuses.push("mirrored");
  }
  if (itemData.sections.some((x) => x.name === "Split status")) {
    itemStatuses.push("split");
  }

  return {
    type: itemType,
    name: itemData.name,
    rarity: itemData.rarity,
    influences: itemInfluences,
    level: itemLevel,
    requirements: itemRequirements,
    enchants: itemEnchants,
    implicits: itemImplicits,
    sockets: itemSockets,
    properties: itemProperties,
    modifiers: itemModifiers,
    gemDescription: itemGemDescription,
    statuses: itemStatuses,
  };
};

const getItemType = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }

  const typeLine = headerSection.lines[headerSection.lines.length - 1];

  if (typeLine.includes("Jewel")) return "Jewel";
  if (typeLine.includes("Flask")) return "Flask";

  const rarityLine = headerSection.lines[0];
  if (rarityLine.includes("Gem")) return "Gem";

  return "Equipment";
};

const getItemInfluences = (sections) => {
  const influencesSection = sections.find((x) => x.name === "Influences");
  if (!influencesSection) {
    return [];
  }

  return influencesSection.lines.map((line) =>
    line
      .match(/([A-Z][a-z]*) Item$/)[1]
      .toLowerCase()
      .trim()
  );
};

const getItemLevel = (sections) => {
  const itemLevelSection = sections.find((x) => x.name === "Item level");
  if (!itemLevelSection || itemLevelSection.length < 1) {
    return "";
  }

  return itemLevelSection.lines[0]
    .match(/Item Level: ([0-9]+)/)[1]
    .toLowerCase()
    .trim();
};

const fillUnknownSections = (sections, itemType) => {
  const unknownSections = sections.filter(
    (section) => section.name === "Unknown"
  );

  if (!unknownSections || unknownSections.length <= 0) {
    return sections;
  }

  unknownSections.forEach((section) => {
    if (section.lines.some((x) => x.includes("Sockets:"))) {
      section.name = "Sockets";
      return;
    }

    if (section.lines.some((x) => x.match(/([A-Z][a-z]*) Item$/))) {
      section.name = "Influences";
      return;
    }

    if (section.lines.some((x) => x.match(/^Corrupted$/))) {
      section.name = "Corrupted status";
      return;
    }

    if (section.lines.some((x) => x.match(/^Mirrored$/))) {
      section.name = "Mirrored status";
      return;
    }

    if (section.lines.some((x) => x.match(/^Split$/))) {
      section.name = "Split status";
      return;
    }

    return;
  });

  const headerIndex = sections.find((x) => x.name === "Header").index;
  if (sections[headerIndex + 1].name === "Unknown") {
    sections[headerIndex + 1].name = "Properties";
  }

  if (itemType !== "Normal" && itemType !== "Gem") {
    const modifiersIndex = sections.find((x) => x.name === "Unknown").index;
    sections[modifiersIndex].name = "Modifiers";
  }

  if (itemType === "Gem") {
    const gemDescriptionIndex = sections.find((x) => x.name === "Unknown")
      .index;
    sections[gemDescriptionIndex].name = "Gem description";

    if (sections[gemDescriptionIndex + 1].name === "Unknown") {
      sections[gemDescriptionIndex + 1].name = "Modifiers";
    }
  }

  return sections;
};
