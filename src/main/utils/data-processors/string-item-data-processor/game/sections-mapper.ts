import { PoeItemDataSection } from "@/types";

export const mapSections = (rawData: String): PoeItemDataSection[] => {
  const rawSections = rawDataToRawSections(rawData);
  let namedSections = rawSectionsToNamedSections(rawSections);
  namedSections = fillUnknownSections(namedSections);
  namedSections = removeUnknownSections(namedSections);
  namedSections = reasignSectionsForDivCard(namedSections);

  return namedSections;
};

export const remapSiegeOfTheAtlasInfluences = (
  sections: PoeItemDataSection[]
): PoeItemDataSection[] => {
  const modifiers = sections.find((s) => s.name === "Modifiers");

  if (!modifiers) {
    return sections;
  }

  const eaterOfWorldsInfluence = modifiers.lines.indexOf(
    "Eater of Worlds Item"
  );
  const searingExarchInfluence = modifiers.lines.indexOf("Searing Exarch Item");

  if (eaterOfWorldsInfluence < 0 && searingExarchInfluence < 0) {
    return sections;
  }

  const newInfluences = [];

  if (eaterOfWorldsInfluence > 0) {
    modifiers.lines.splice(eaterOfWorldsInfluence, 1);
    newInfluences.push("Eater of Worlds Item");
  }

  if (searingExarchInfluence > 0) {
    modifiers.lines.splice(searingExarchInfluence, 1);
    newInfluences.push("Searing Exarch Item");
  }

  let influencesSection = sections.find((s) => s.name === "Influences");
  if (influencesSection) {
    influencesSection.lines = [...influencesSection.lines, ...newInfluences];
  } else {
    influencesSection = {
      name: "Influences",
      lines: newInfluences,
      index: sections.length,
    };
    sections.push(influencesSection);
  }

  return sections;
};

const rawDataToRawSections = (rawData: String): String[][] => {
  const lines = splitDescriptionToLines(rawData);
  const rawSections = splitLinesIntoSections(lines);
  const sections = cleanupRawSections(rawSections);

  return sections;
};

const rawSectionsToNamedSections = (
  rawSections: String[][]
): PoeItemDataSection[] =>
  rawSections.map((lines: String[], index: Number): any => ({
    name: getSectionName(lines),
    lines,
    index,
  }));

const splitDescriptionToLines = (rawData: String): String[] =>
  rawData
    .split("\n")
    .map((line) => line.replace("\r", "").trim())
    .filter((x) => x.length > 0);

const splitLinesIntoSections = (descriptionLines: String[]): String[][] => {
  const sections: String[][] = [];
  let section: String[] = [];

  descriptionLines.forEach((line, index) => {
    if (line.startsWith("----")) {
      sections.push(section);
      section = [];
    } else if (index + 1 === descriptionLines.length) {
      section.push(line);
      sections.push(section);
      section = [];
    } else {
      section.push(line);
    }
  });

  return sections;
};

const cleanupRawSections = (rawSections: String[][]): String[][] =>
  rawSections.map((s) => s.map((l) => l.trim()).filter((l) => l.length > 0));

const getSectionName = (section: String[]): String => {
  if (section.some((x) => x.startsWith("Item Class:"))) {
    return "Header";
  }

  if (section.some((x) => x.startsWith("Requirements:"))) {
    return "Requirements";
  }

  if (section.some((x) => x.startsWith("Item Level:"))) {
    return "Item level";
  }

  if (section.some((x) => x.includes("(enchant)"))) {
    return "Enchants";
  }

  if (section.some((x) => x.includes("(scourge)"))) {
    return "Scourge";
  }

  if (section.some((x) => x.includes("(implicit)"))) {
    return "Implicits";
  }

  if (section.some((x) => x.startsWith("Quality"))) {
    return "Properties";
  }

  if (section.some((x) => x.startsWith("Sockets:"))) {
    return "Sockets";
  }

  if (section.every((x) => x.match(/^([A-z ]*) Item$/))) {
    return "Influences";
  }

  if (section.some((x) => x.match(/^Corrupted$/))) {
    return "Corrupted status";
  }

  if (section.some((x) => x.match(/^Split$/))) {
    return "Split status";
  }

  if (section.some((x) => x.match(/^Mirrored$/))) {
    return "Mirrored status";
  }

  if (section.some((x) => x.match(/^Talisman Tier:/))) {
    return "Talisman tier";
  }

  if (section.some((x) => x.match(/^Flavour Text:/i))) {
    return "Flavour text";
  }

  return "Unknown";
};

const fillUnknownSections = (
  sections: PoeItemDataSection[]
): PoeItemDataSection[] => {
  const unknownSections = sections.filter(
    (section) => section.name === "Unknown"
  );

  if (!unknownSections || unknownSections.length <= 0) {
    return sections;
  }

  const headerSection = sections.find((x) => x.name === "Header");

  if (!headerSection) {
    return sections;
  }

  const headerSectionIndex = headerSection?.index;
  const itemRarityLine = headerSection.lines[1];

  const itemIsGem = itemRarityLine.includes("Gem");
  const itemIsDivinityCard = itemRarityLine.includes("Divination");
  const itemIsNormal = itemRarityLine.includes("Normal");

  if (sections[headerSectionIndex + 1].name === "Unknown") {
    sections[headerSectionIndex + 1].name = "Properties";
  }

  if (!itemIsNormal && !itemIsGem) {
    const modifiersIndex = sections.find((x) => x.name === "Unknown")?.index;
    if (modifiersIndex) sections[modifiersIndex].name = "Modifiers";

    if (
      !sections.some((x) => x.name === "Flavour text") &&
      modifiersIndex &&
      sections[modifiersIndex + 1] &&
      sections[modifiersIndex + 1].name === "Unknown" &&
      itemRarityLine.includes("Unique")
    ) {
      sections[modifiersIndex + 1].name = "Flavour text";
    }
  }

  if (itemIsGem) {
    const gemDescriptionIndex = sections.find(
      (x) => x.name === "Unknown"
    )?.index;
    if (gemDescriptionIndex) {
      sections[gemDescriptionIndex].name = "Gem description";

      if (sections[gemDescriptionIndex + 1].name === "Unknown") {
        sections[gemDescriptionIndex + 1].name = "Modifiers";
      }
    }
  }

  if (itemIsDivinityCard) {
    const divCardFlavorTextIndex = sections.find(
      (x) => x.name === "Unknown"
    )?.index;

    if (divCardFlavorTextIndex) {
      sections[divCardFlavorTextIndex].name = "Flavour text";
    }
  }

  return sections;
};

const reasignSectionsForDivCard = (
  sections: PoeItemDataSection[]
): PoeItemDataSection[] => {
  const headerSection = sections.find((x) => x.name === "Header");
  if (!headerSection) {
    return sections;
  }

  const itemRarityLine = headerSection.lines[1];
  if (!itemRarityLine) {
    return sections;
  }

  const itemIsDivinityCard = itemRarityLine.includes("Divination");
  if (!itemIsDivinityCard) {
    return sections;
  }

  let _sections = [...sections];
  _sections = removeNamedSection(_sections, "Header");
  const newSections: PoeItemDataSection[] = [headerSection];

  const propertiesSection = sections.find((x) => x.name === "Properties");
  _sections = removeNamedSection(_sections, "Properties");

  if (propertiesSection) {
    const stacksSection = { ...propertiesSection };
    stacksSection.name = "Div card stacks";
    stacksSection.index = 1;
    newSections.push(stacksSection);
  }

  const misslabeledSections = _sections.filter(
    (s) => !["Modifiers", "Flavour text"].includes(s.name as string)
  );
  const modifiersSection = _sections.find((s) => s.name === "Modifiers");

  if (misslabeledSections.length > 0) {
    const descriptionSection: PoeItemDataSection = {
      index: newSections.length,
      name: "Div card description",
      lines: misslabeledSections.map((s) => s.lines).flat(),
    };
    newSections.push(descriptionSection);

    if (modifiersSection) {
      const flavourTextSection = {
        index: newSections.length,
        name: "Flavour text",
        lines: [...modifiersSection.lines],
      };
      newSections.push(flavourTextSection);
    }
  } else {
    if (modifiersSection) {
      const descriptionSection = {
        index: newSections.length,
        name: "Div card description",
        lines: [...modifiersSection.lines],
      };
      newSections.push(descriptionSection);
    }

    const flavourTextSection = sections.find((s) => s.name === "Flavour text");
    if (flavourTextSection) {
      newSections.push({ ...flavourTextSection, index: newSections.length });
    }
  }

  return newSections;
};

const removeNamedSection = (
  sections: PoeItemDataSection[],
  name: string
): PoeItemDataSection[] => {
  const sectionIndex = sections.findIndex((s) => s.name === name);
  if (sectionIndex < 0) {
    return sections;
  }
  sections.splice(sectionIndex, 1);

  return sections;
};

const removeUnknownSections = (
  sections: PoeItemDataSection[]
): PoeItemDataSection[] => sections.filter((x) => x.name !== "Unknown");
