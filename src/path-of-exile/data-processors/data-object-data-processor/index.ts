import { PoeItem, PoePassive } from "@/path-of-exile/types";

export default (data: PoeItem | PoePassive) => {
  if (!data.sections) {
    data.sections = {};
  }

  return data;
};
