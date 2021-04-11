import { descriptionToSections } from "@/shared/data-processors/processor-helper-functions";

export default (rawNodeDescription) => {
  const sections = descriptionToSections(rawNodeDescription);

  const type = sections[0][0].match(/: ([A-z]+)$/)[1];
  const name = sections[0][1];
  const description = sections[1];

  return {
    name,
    type,
    description,
  };
};
