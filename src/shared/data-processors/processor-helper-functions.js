export const descriptionToSections = (rawDescription) => {
  const lines = descriptionToLines(rawDescription);
  const rawSections = splitLinesIntoSections(lines);
  const sections = cleanupRawSections(rawSections);

  return sections;
};

export const removeUnknownSections = (sections) =>
  sections.filter((x) => x.name !== "Unknown");

const descriptionToLines = (rawDescription) =>
  rawDescription
    .split("\n")
    .map((line) => line.replace("\r", ""))
    .filter((x) => x.length > 0);

const cleanupRawSections = (rawSections) =>
  rawSections.map((s) => s.map((l) => l.trim()).filter((l) => l.length > 0));

const splitLinesIntoSections = (descLines) => {
  const sections = [];
  let section = [];

  descLines.forEach((line, index) => {
    if (line.includes("----")) {
      sections.push(section);
      section = [];
    } else if (index + 1 === descLines.length) {
      section.push(line);
      sections.push(section);
      section = [];
    } else {
      section.push(line);
    }
  });

  return sections;
};
