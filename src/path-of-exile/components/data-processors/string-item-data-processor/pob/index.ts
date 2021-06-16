export default (rawData: String): PoeItem => {
  const dataLinesList = rawData.split("\n");
  const sections = cleanMetadata(dataLinesList);
  const mappedSections = mapSections(sections);
  console.log(sections);

  return {} as PoeItem;
};

const mapSections = (sections: string[]): PoeItem => {
  const item: PoeItem = {} as PoeItem;
  const craftedItemLine = 0;
  let line = "";
  let lineIndex = 0;

  item.name = sections[lineIndex];

  do {
    lineIndex++;
    line = sections[lineIndex];
  } while (!line.includes("Crafted:"));

  console.log(item);

  return item;
};

const cleanMetadata = (dataLinesList: string[]): string[] =>
  dataLinesList.filter((line) => {
    if (
      line.includes("Prefix:") ||
      line.includes("Prefix:") ||
      line.includes("Variant:") ||
      line.includes("variant:")
    ) {
      return false;
    }

    return true;
  });
