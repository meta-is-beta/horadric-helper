export default (rawData: String): PoeItemDataSection[] => {
  const dataLinesList = rawData.split("\n");
  const sections = cleanMetadata(dataLinesList);

  console.log(sections);

  return [];
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
