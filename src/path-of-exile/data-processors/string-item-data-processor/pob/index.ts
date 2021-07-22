import {
  PoeItem,
  PoeItemInfluence,
  PoeItemRarity,
  PoeItemStatus,
  PoeItemType,
} from "@/path-of-exile/types";

export default (rawData: String): PoeItem => {
  const item: PoeItem = {} as PoeItem;

  const dataLinesList = getDataLinesList(rawData);
  const selectedVariant = getSelectedVariant(dataLinesList);
  const sections = cleanMetadata(dataLinesList);

  item.rarity = getItemRarity(sections);

  const headerIndexOffset = getHeaderIndexOffset(item.rarity);

  item.name = sections[1];
  item.baseName = getItemBaseName(headerIndexOffset, sections);
  item.influences = getItemInfluences(headerIndexOffset, sections);
  item.type = getItemType(item.baseName);
  item.sockets = getItemSockets(sections);

  const [implicits, enchants, implicitsEndIndex] = getItemImplicitsAndEnchants(
    sections,
    selectedVariant
  );

  const [statuses, statusesStartIndex] = getItemStatuses(sections);

  const modifiers = getItemModifiers(
    sections,
    implicitsEndIndex,
    statusesStartIndex
  );

  item.sections = {
    requirements: getItemRequirements(sections),
    properties: getItemProeprties(sections),
    implicits,
    enchants,
    modifiers,
    statuses,
  };

  return item;
};

const getDataLinesList = (rawData: String) =>
  rawData
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

const getHeaderIndexOffset = (rarity: PoeItemRarity) => {
  return rarity === "rare" || rarity === "unique" ? 1 : 0;
};

const processValuesInLine = (line: String): String => {
  const rangeValueMatch = line.match(/{range:([0-9.]+)}/);
  if (!rangeValueMatch) {
    return line;
  }

  const rangePercentageValue = parseFloat(rangeValueMatch[1]);

  const valuesMatch = line.match(/\(([0-9.]+)-([0-9.]+)\)/);
  if (!valuesMatch) {
    return line;
  }

  const lowerRangeValue = parseFloat(valuesMatch[1]);
  const upperRangeValue = parseFloat(valuesMatch[2]);
  const calculatedValue = Math.floor(
    (upperRangeValue - lowerRangeValue) * rangePercentageValue + lowerRangeValue
  );

  return line.replace(/\(([0-9.,]+-[0-9.,]+)\)/g, `${calculatedValue}`);
};

const cleanStatLine = (line: String): String =>
  line
    .replace(/{range:([0-9.,]+)}/, "")
    .replace(/{variant:[0-9.,]+}/, "")
    .replace(/{tags:[a-z.,_]+}/, "");

const getItemProeprties = (sections: String[]): String[] => {
  const qualityLine = sections.find((s) => s.includes("Quality: "));

  if (!qualityLine || qualityLine.includes(" 0")) {
    return [];
  }

  const qualityValueMatch = qualityLine.match(/: ([0-9]+)/);

  if (!qualityValueMatch) {
    return [];
  }

  return [`Quality: ${qualityValueMatch[1]}%`];
};

const getItemStatuses = (sections: String[]): [PoeItemStatus[], number] => {
  return (getSectionsFromLine(
    sections,
    sections.length - 1,
    /^(Corrupted|Mirrored|Split)$/
  ) as unknown) as [PoeItemStatus[], number];
};

const getItemModifiers = (
  sections: String[],
  implicitsEndIndex: number,
  statusesStartIndex: number
) => {
  return sections
    .slice(
      implicitsEndIndex,
      statusesStartIndex === sections.length
        ? sections.length
        : statusesStartIndex
    )
    .map((line) => cleanStatLine(processValuesInLine(line)));
};

const getItemImplicitsAndEnchants = (
  sections: String[],
  selectedVariant: String
): [String[], String[], number] => {
  let implicitsStartIndex = 0;

  const implicitCountLine = sections.find((s, i) => {
    implicitsStartIndex = i;
    return s.includes("Implicits: ");
  });

  if (!implicitCountLine) {
    return [[], [], 0];
  }

  const matches = implicitCountLine.match(/^Implicits: ([0-9]+)$/);
  if (!matches) {
    return [[], [], 0];
  }

  const implicitsCount = matches[1];

  const implicitLines = sections
    .slice(
      implicitsStartIndex + 1,
      implicitsStartIndex + 1 + parseInt(implicitsCount)
    )
    .filter((line) => {
      if (!line.includes("{variant:")) {
        return true;
      }

      if (!line.includes(`{variant:${selectedVariant}}`)) {
        return false;
      }

      return true;
    })
    .map((line) => cleanStatLine(processValuesInLine(line)));

  const enchants = implicitLines
    .filter((line) => line.startsWith("{crafted}"))
    .map((line) => line.replace("{crafted}", ""));

  const nonEnchants = implicitLines.filter(
    (line) => !line.startsWith("{crafted}")
  );

  return [
    nonEnchants,
    enchants,
    implicitsStartIndex + 1 + parseInt(implicitsCount),
  ];
};

const getItemRequirements = (sections: String[]): String[] => {
  const reqLine = sections.find((s) => s.includes("LevelReq:"));

  if (!reqLine) {
    return [];
  }

  const matches = reqLine.match(/^LevelReq: (.+)$/);
  if (!matches) {
    return [];
  }

  return [`Level: ${matches[1]}`];
};

const getItemSockets = (sections: String[]): String | undefined => {
  const socketsLine = sections.find((s) => s.includes("Sockets:"));

  if (!socketsLine) {
    return undefined;
  }

  const matches = socketsLine.match(/^Sockets: (.+)$/);
  if (!matches) {
    return undefined;
  }

  return matches[1];
};

const getItemType = (baseName: String): PoeItemType => {
  if (baseName.includes("Jewel")) return "jewel";
  if (baseName.includes("Flask")) return "flask";
  if (baseName.includes("Gem")) return "gem";
  if (baseName.includes("Currency")) return "currency";
  if (baseName.includes("Maps")) return "map";

  return "equipment";
};

const getItemInfluences = (
  headerIndexOffset: number,
  sections: String[]
): PoeItemInfluence[] => {
  const [influenceSections] = getSectionsUpToLine(
    sections,
    headerIndexOffset + 2,
    /^[A-z]+ Item$/
  );

  if (influenceSections.length < 0) {
    return [];
  }

  return influenceSections.map((i) => {
    const match = i.match(/^([A-z]+) Item$/);
    return match ? match[1] : "";
  }) as PoeItemInfluence[];
};

const getItemBaseName = (
  headerIndexOffset: number,
  sections: String[]
): String => sections[headerIndexOffset + 1];

const getItemRarity = (sections: String[]): PoeItemRarity => {
  const rarityLine = sections.find((s) => s.includes("Rarity: "));

  if (!rarityLine) {
    return "";
  }

  const matches = rarityLine.match(/^Rarity: ([A-Z]+)$/);
  if (!matches) {
    return "";
  }

  return (matches[1].toLowerCase() as unknown) as PoeItemRarity;
};

const getSelectedVariant = (sections: String[]): String => {
  const socketsLine = sections.find((s) => s.includes("Selected Variant:"));

  if (!socketsLine) {
    return "";
  }

  const matches = socketsLine.match(/Selected Variant: ([0-9]+)$/);
  if (!matches) {
    return "";
  }

  return matches[1];
};

const getSectionsUpToLine = (
  sections: String[],
  startIndex: number,
  pattern: RegExp
): [String[], Number] => {
  const selectedSections: String[] = [];
  let currentLine: String = sections[startIndex];
  let index = startIndex;

  while (pattern.test(currentLine as string)) {
    selectedSections.push(currentLine);

    index++;
    if (index + 1 === selectedSections.length) {
      break;
    }

    currentLine = sections[index];
  }

  return [selectedSections, index - 1];
};

const getSectionsFromLine = (
  sections: String[],
  startIndex: number,
  pattern: RegExp
): [String[], number] => {
  const selectedSections: String[] = [];
  let currentLine: String = sections[startIndex];
  let index = startIndex;

  while (pattern.test(currentLine as string)) {
    selectedSections.push(currentLine);

    index--;
    if (index === 0) {
      break;
    }

    currentLine = sections[index];
  }

  return [selectedSections, index + 1];
};

const cleanMetadata = (dataLinesList: string[]): string[] =>
  dataLinesList.filter((line) => {
    if (
      line.includes("Prefix:") ||
      line.includes("Suffix:") ||
      line.includes("Variant: ") ||
      line.includes("Crafted: ")
    ) {
      return false;
    }

    return true;
  });
