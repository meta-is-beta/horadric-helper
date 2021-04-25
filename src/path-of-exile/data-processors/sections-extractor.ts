import "./../types";

export default (rawData: String): PoeItemDataSection[] => {
  const rawSections = rawDataToRawSections(rawData);
  let namedSections = rawSectionsToNamedSections(rawSections);
  namedSections = fillUnknownSections(namedSections);
  namedSections = removeUnknownSections(namedSections);

  return namedSections;
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
    .map((line) => line.replace("\r", ""))
    .filter((x) => x.length > 0);

const splitLinesIntoSections = (descriptionLines: String[]): String[][] => {
  const sections: String[][] = [];
  let section: String[] = [];

  descriptionLines.forEach((line, index) => {
    if (line.includes("----")) {
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
  if (section.some((x) => x.includes("Item Class:"))) {
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

  if (section.some((x) => x.includes("Sockets:"))) {
    return "Sockets";
  }

  if (section.some((x) => x.match(/([A-Z][a-z]*) Item$/))) {
    return "Influences";
  }

  if (section.some((x) => x.match(/^Corrupted$/))) {
    return "Corrupted status";
  }

  if (section.some((x) => x.match(/^Mirrored$/))) {
    return "Mirrored status";
  }

  if (section.some((x) => x.match(/^Split$/))) {
    return "Split status";
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
  const headerSectionIndex = headerSection.index;
  const itemTypeLine = headerSection.lines[0];
  const itemRarityLine = headerSection.lines[1];

  const itemIsGem = itemRarityLine.includes("Gem");
  const itemIsNormal = itemTypeLine.includes("Normal");

  if (sections[headerSectionIndex + 1].name === "Unknown") {
    sections[headerSectionIndex + 1].name = "Properties";
  }

  if (!itemIsNormal && !itemIsGem) {
    const modifiersIndex = sections.find((x) => x.name === "Unknown").index;
    sections[modifiersIndex].name = "Modifiers";
  }

  if (itemIsGem) {
    const gemDescriptionIndex = sections.find((x) => x.name === "Unknown")
      .index;
    sections[gemDescriptionIndex].name = "Gem description";

    if (sections[gemDescriptionIndex + 1].name === "Unknown") {
      sections[gemDescriptionIndex + 1].name = "Modifiers";
    }
  }

  return sections;
};

const removeUnknownSections = (
  sections: PoeItemDataSection[]
): PoeItemDataSection[] => sections.filter((x) => x.name !== "Unknown");
