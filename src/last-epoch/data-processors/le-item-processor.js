import processItemDescription from "./core-item-processor";
import { removeUnknownSections } from "./processor-helper-functions";

export default (rawDescription) => {
  if (!rawDescription) {
    throw new Error();
  }

  const itemData = processItemDescription(rawDescription);
  itemData.sections = fillUnknownSections(itemData.sections);
  itemData.sections = removeUnknownSections(itemData.sections);

  return { ...itemData };
};

const fillUnknownSections = (sections) => {
  const unknownSections = sections.filter(
    (section) => section.name === "Unknown"
  );

  if (!unknownSections || unknownSections.length <= 0) {
    return sections;
  }

  const headerIndex = sections.find((x) => x.name === "Header").index;
  if (sections[headerIndex + 1].name === "Unknown") {
    sections[headerIndex + 1].name = "Properties";
  }

  const modifiersIndex = sections.find((x) => x.name === "Unknown").index;
  sections[modifiersIndex].name = "Modifiers";

  return sections;
};
