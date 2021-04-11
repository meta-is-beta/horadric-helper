import { descriptionToSections } from "./processor-helper-functions";

export default (rawDescription) => {
  if (!rawDescription) {
    throw new Error();
  }
  let rawSections = descriptionToSections(rawDescription);

  let sections = rawSections.map((lines, index) => ({
    name: getSectionName(lines),
    lines,
    index,
  }));

  const itemName = getItemName(sections);
  const itemRarity = getItemRarity(sections);

  return {
    sections,
    name: itemName,
    rarity: itemRarity,
  };
};

const getItemRarity = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }
  const rarityLine = headerSection.lines[0];

  return rarityLine.match(/Rarity: (.*)/)[1];
};

const getItemName = (sections) => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return "";
  }

  return headerSection.lines[1];
};

const getSectionName = (section) => {
  if (section.some((x) => x.includes("Rarity:"))) {
    return "Header";
  }

  if (section.some((x) => x.includes("Requirements"))) {
    return "Requirements";
  }

  if (section.some((x) => x.includes("Item Level:"))) {
    return "Item level";
  }

  if (section.some((x) => x.includes("(enchant)"))) {
    return "Enchants";
  }

  if (section.some((x) => x.includes("(implicit)"))) {
    return "Implicits";
  }

  if (section.some((x) => x.includes("Quality"))) {
    return "Properties";
  }

  return "Unknown";
};
